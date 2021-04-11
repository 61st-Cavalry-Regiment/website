import { Component, OnInit, SecurityContext } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { UnitPhotos } from '../models/unit-photos.model'
import { CdnService } from '../services/cdn.service'

@Component({
  templateUrl: './unit-photos.component.html',
  styleUrls: ['./unit-photos.component.scss'],
})
export class UnitPhotosComponent implements OnInit {
  unitPhotos: UnitPhotos
  photos: string[] = [
    this.CDN.getImage({ path: 'unit-photos/img_1.jpg', width: 1300 }),
    this.CDN.getImage({ path: 'unit-photos/img_2.jpg', width: 1300 }),
    this.CDN.getImage({ path: 'unit-photos/img_3.jpg', width: 1300 }),
    this.CDN.getImage({ path: 'unit-photos/img_4.jpg', width: 1300 }),
    this.CDN.getImage({ path: 'unit-photos/img_5.jpg', width: 1300 }),
  ]
  ytVid: string = 'https://www.youtube-nocookie.com/embed/'
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private title: Title,
    private CDN: CdnService
  ) {
    this.title.setTitle('Unit Photos - 61st Cavalry Regiment')
  }

  ngOnInit(): void {
    this.firestore
      .doc<UnitPhotos>('util/unit-photos')
      .valueChanges()
      .subscribe(
        (unitPhotos) =>
          (this.ytVid = `https://www.youtube-nocookie.com/embed/${unitPhotos.latestOperation}`)
      )
  }
}
