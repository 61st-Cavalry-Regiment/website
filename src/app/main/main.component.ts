import { Component, OnInit } from '@angular/core'
import { AngularFireAnalytics } from '@angular/fire/analytics'
import { AngularFireStorage } from '@angular/fire/storage'
import { Title } from '@angular/platform-browser'
import { Observable, of } from 'rxjs'
import { finalize, take } from 'rxjs/operators'
import { AuthService } from '../services/auth/auth.service'
import { environment } from 'src/environments/environment'
import { CdnService } from '../services/cdn.service'
import { MatDialog } from '@angular/material/dialog'
import { ImgUploadComponent } from '../modals/img-upload/img-upload.component'
declare var $: any
@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  imgPending: File
  isLoggedIn: Observable<boolean>
  constructor(
    private storage: AngularFireStorage,
    public auth: AuthService,
    private title: Title,
    private analitics: AngularFireAnalytics,
    public CDN: CdnService,
    private dialog: MatDialog
  ) {
    this.title.setTitle('61st Cavalry Regiment')
  }

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = this.auth.isLoggedIn
    // this.changeImg('img1', 'test/')
  }

  changeImg(img: string, path) {
    console.log('Img Changed')
    this.dialog.open(ImgUploadComponent, {
      data: {
        img: img,
        path: path,
      },
    })
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
      meta.customMetadata.author = `${user.userName}`
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
