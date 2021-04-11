import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class CdnService {
  uri: string
  allowedPrefix = '/image/'
  constructor() {
    this.uri = environment.cdn
  }
  getImage(props: ImageProps): string {
    let request = ''
    if (props.width || props.height || props.lossless) {
      if (props.width) {
        request += `width=${props.width}`
      }
      if (props.height) {
        request += `height=${props.height}`
      }
      if (props.lossless) {
        request += `lossless=${props.lossless}`
      }
      request += '/'
    }
    request += props.path
    return this.uri + `image/` + request
  }

  getImageProps(url: string): ImageProps {
    console.log(url)

    const urlNoPrefix = url.slice(
      url.indexOf(this.allowedPrefix) + this.allowedPrefix.length
    )
    console.log(urlNoPrefix)
    const optionsSlashIdx = urlNoPrefix.indexOf('/')
    const optionsStr = this.parseOptions(urlNoPrefix.slice(0, optionsSlashIdx))
    return {
      path: urlNoPrefix.slice(optionsSlashIdx + 1),
      ...optionsStr,
    }
  }

  parseOptions = (
    options: string
  ): {
    width?: number
    height?: number
    lossless?: boolean
  } =>
    options
      .split(',')
      .reduce((acc, option) => ({ ...acc, ...this.optionToKeyVal(option) }), {})
  optionToKeyVal = (option: string) =>
    ((split) =>
      split.length > 0
        ? { [split[0]]: split.length > 1 ? split[1] : true }
        : undefined)([option.split('=')[0], parseInt(option.split('=')[1])])
}

export interface ImageProps {
  path: string
  width?: number
  height?: number
  lossless?: boolean
}
