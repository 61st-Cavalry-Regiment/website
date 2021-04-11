import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { MatDialog } from '@angular/material/dialog'
import { Observable, of } from 'rxjs'
import { ImgUploadComponent } from 'src/app/modals/img-upload/img-upload.component'
import { ImgViewComponent } from 'src/app/modals/img-view/img-view.component'
import { UnitPhotos } from 'src/app/models/unit-photos.model'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth/auth.service'
import { CdnService } from 'src/app/services/cdn.service'

@Component({
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss'],
})
export class WebsiteComponent implements OnInit {
  user: Observable<User>
  unitPhotos: UnitPhotos
  imgs: string[] = []
  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    public CDN: CdnService,
    private dialog: MatDialog
  ) {
    this.user = auth.user$
  }

  ngOnInit(): void {
    this.firestore
      .doc<UnitPhotos>('util/unit-photos')
      .valueChanges()
      .subscribe((unitPhotos) => (this.unitPhotos = unitPhotos))
    for (let index = 0; index < 5; index++) {
      this.imgs[index] = this.CDN.getImage({
        path: `unit-photos/img_${index + 1}.jpg`,
        height: 70,
      })
    }
  }

  changeImg(img: string, path: string) {
    this.dialog.open(ImgUploadComponent, { data: { path: path, img: img } })
  }
  openImg(img: string) {
    const imgProps = this.CDN.getImageProps(img)
    this.dialog.open(ImgViewComponent, {
      data: { img: this.CDN.getImage({ path: imgProps.path, width: 1000 }) },
    })
  }
}
