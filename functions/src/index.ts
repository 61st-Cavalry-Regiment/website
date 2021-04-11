import * as functions from 'firebase-functions'
import * as https from 'https'
import * as sharp from 'sharp'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as admin from 'firebase-admin'
admin.initializeApp()

exports.combineName = functions.https.onCall(
  (data: { name: name }, context) => {
    const name = data.name
    return {
      displayName: `${name.firstInital}. ${name.lastName} "${name.nickName}"`,
    }
  }
)
interface name {
  firstInital: string
  lastName: string
  nickName: string
}

const optionToKeyVal = (option: string) =>
  ((split: string[]) =>
    split.length > 0
      ? { [split[0]]: split.length > 1 ? split[1] : true }
      : undefined)(option.split('='))

// Parse options string and return options object
const parseOptions = (
  options: string
): {
  width?: string
  height?: string
  lossless?: boolean
} =>
  options
    .split(',')
    .reduce((acc, option) => ({ ...acc, ...optionToKeyVal(option) }), {})

// Configure allowed request URLs. This should match the hosting glob pattern
const allowedPrefix = '/image/'
const isUrlAllowed = (url: string) => url.startsWith(allowedPrefix)

// Configure source image URLs. This assumes that we store images on Firebase Storage
// const projectId = process.env.GCLOUD_PROJECT
const sourcePrefix = `https://firebasestorage.googleapis.com/v0/b/61st-regiment/o/`
const sourceSuffix = `?alt=media`

// Validate and split request URL into options and source parts
const tokenizeUrl = (url: string) => {
  if (!isUrlAllowed(url)) {
    throw new Error('URL is not allowed')
  }
  const urlNoPrefix = url.slice(allowedPrefix.length)
  const optionsSlashIdx = urlNoPrefix.indexOf('/')
  const sourceKey = encodeURIComponent(urlNoPrefix.slice(optionsSlashIdx + 1))
  const optionsStr = urlNoPrefix.slice(0, optionsSlashIdx)
  const sourceUrl = sourcePrefix + sourceKey + sourceSuffix
  return [optionsStr, sourceUrl]
}

// Set CDN caching duration in seconds
const cacheMaxAge = 1 * 60 * 60 // 1 Hour

export const imageTransform = functions.https.onRequest((request, response) => {
  let sourceUrl
  let options
  try {
    const [optionsStr, sourceUrlStr] = tokenizeUrl(request.url)
    sourceUrl = new URL(sourceUrlStr)
    options = parseOptions(optionsStr)
  } catch (error) {
    response.status(400).send()
    return
  }
  // Modern browsers that support WebP format will send an appropriate Accept header
  const acceptHeader = request.header('Accept')
  const webpAccepted =
    !!acceptHeader && acceptHeader.indexOf('image/webp') !== -1

  // If one of the dimensions is undefined the automatic sizing
  // preserving the aspect ratio will be applied
  const transform = sharp()
    .resize(
      options.width ? Number(options.width) : undefined,
      options.height ? Number(options.height) : undefined,
      {
        fit: 'cover',
      }
    )
    .webp({ force: webpAccepted, lossless: !!options.lossless })

  // Set cache control headers. This lets Firebase Hosting CDN to cache
  // the converted image and serve it from cache on subsequent requests.
  // We need to Vary on Accept header to correctly handle WebP support detection.
  const responsePipe = response
    .set('Cache-Control', `public, max-age=${cacheMaxAge}`)
    .set('Vary', 'Accept')

  // The built-in node https works here
  https.get(sourceUrl, (res) => res.pipe(transform).pipe(responsePipe))
})
