import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { Title } from '@angular/platform-browser'
import { Observable, of } from 'rxjs'
import { finalize, map } from 'rxjs/operators'
import { Code, Codes } from '../models/codes.model'
import { UnitPhotos } from '../models/unit-photos.model'
import { User } from '../models/user.model'
import { AuthService } from '../services/auth/auth.service'
declare var $: any
@Component({
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {
  codes: Code[]
  user: Observable<User> = of({ roles: { admin: false, website: false } })
  imgs: Observable<string>[] = []
  imgUrl: Observable<string>
  imgPending: File
  unitPhotos: UnitPhotos

  constructor(
    public auth: AuthService,
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
    private title: Title
  ) {
    this.user = this.auth.user$
    this.user.subscribe(console.log)
  }

  ngOnInit(): void {
    $('#changeImg').on('show.bs.modal', function (event) {
      var images: Map<string, string> = new Map([
        ['img_1', 'Image 1'],
        ['img_2', 'Image 2'],
        ['img_3', 'Image 3'],
        ['img_4', 'Image 4'],
        ['img_5', 'Image 5'],
      ])
      var button = $(event.relatedTarget) // Button that triggered the modal
      var image = button.data('image') // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this)

      modal.find('.modal-title').text('Change image for ' + images.get(image))
      modal.find('#save').data('image', image)
    })
  }

  openImg(img) {
    this.imgUrl = img
  }

  test() {
    console.log(this.codes)
  }

  generateCode() {
    // this.auth.generateCode()
  }

  clearCodes() {
    this.fireStore
      .collection<Code>('codes')
      .snapshotChanges()
      .pipe(
        map((doc) => {
          doc.map((d) => {
            d.payload.doc.ref.delete()
          })
        })
      )
  }

  uploadFile(event) {
    const images = new Map([
      ['img_1', 0],
      ['img_2', 1],
      ['img_3', 2],
      ['img_4', 3],
      ['img_5', 4],
    ])
    let meta = {
      customMetadata: {
        author: '',
      },
    }
    this.auth.user$.subscribe((user) => {
      meta.customMetadata.author = `${user.firstInitial}.${user.lastName}`
    })
    console.log(this.imgPending)
    const image = $(event.target).data('image')
    const filePath = 'unit-photos/' + image + '.jpg'
    const fileRef = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, this.imgPending, meta)
    task
      .snapshotChanges()
      .pipe(
        finalize(
          () => (this.imgs[images.get(image)] = fileRef.getDownloadURL())
        )
      )
      .subscribe()
    $('#changeImg').modal('hide')
  }

  fileSelector(event) {
    this.imgPending = event.target.files[0]
  }

  changeVid(vid) {
    let re = /[a-zA-z\-0-9]*$/
    this.fireStore
      .doc<UnitPhotos>('util/unit-photos')
      .update({ latestOperation: re.exec(vid)[0] })
    $('#changeVid').modal('hide')
  }
}
