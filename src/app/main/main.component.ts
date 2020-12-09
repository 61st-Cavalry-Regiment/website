import { Component, OnInit } from '@angular/core'
import { AngularFireAnalytics } from '@angular/fire/analytics'
import { AngularFireStorage } from '@angular/fire/storage'
import { Title } from '@angular/platform-browser'
import { Observable, of } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { AuthService } from '../services/auth/auth.service'
declare var $: any
@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  imgUrl: Observable<string | null> = of('../../assets/blank.png')
  imgUrl2: Observable<string | null> = of('../../assets/blank.png')
  imgPending: File
  isLoggedIn: Observable<boolean>
  constructor(
    private storage: AngularFireStorage,
    public auth: AuthService,
    private title: Title,
    private analitics: AngularFireAnalytics
  ) {
    this.title.setTitle('61st Cavalry Regiment')
  }

  ngOnInit(): void {
    $('#changeImg').on('show.bs.modal', function (event) {
      var images: Map<string, string> = new Map([
        ['img_1', 'Image 1'],
        ['img_2', 'Image 2'],
      ])
      var button = $(event.relatedTarget) // Button that triggered the modal
      var image = button.data('whatever') // Extract info from data-* attributes
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this)

      modal.find('.modal-title').text('Change image for ' + images.get(image))
      modal.find('#save').data('whatever', image)
    })
    this.isLoggedIn = this.auth.isLoggedIn
    this.imgUrl = this.storage.ref('home/img_1.jpg').getDownloadURL()
    this.imgUrl2 = this.storage.ref('home/img_2.jpg').getDownloadURL()
  }

  changeImg(img: string) {
    console.log('Img Changed')
  }

  uploadFile(event) {
    const images = new Map([
      ['img_1', 'imgUrl'],
      ['img_2', 'imgUrl2'],
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
    const image = $(event.target).data('whatever')
    const filePath = 'home/' + image + '.jpg'
    const fileRef = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, this.imgPending, meta)
    task
      .snapshotChanges()
      .pipe(
        finalize(() => (this[images.get(image)] = fileRef.getDownloadURL()))
      )
      .subscribe()
    $('#changeImg').modal('hide')
  }

  fileSelector(event) {
    this.imgPending = event.target.files[0]
  }

  click(link: string, name: string) {
    this.analitics.logEvent('link_click', { link: link, name: name })
  }
}
