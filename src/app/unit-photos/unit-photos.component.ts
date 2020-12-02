import { Component, OnInit, SecurityContext } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { UnitPhotos } from '../models/unit-photos.model'

@Component({
  templateUrl: './unit-photos.component.html',
  styleUrls: ['./unit-photos.component.scss'],
})
export class UnitPhotosComponent implements OnInit {
  unitPhotos: UnitPhotos
  photos: Observable<string>[] = []
  ytVid: string = 'https://www.youtube-nocookie.com/embed/'
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private title: Title
  ) {
    this.title.setTitle('Unit Photos - 61st Cavalry Regiment')
  }

  ngOnInit(): void {
    for (let index = 0; index < 5; index++) {
      this.photos[index] = this.storage
        .ref(`unit-photos/img_${index + 1}.jpg`)
        .getDownloadURL()
    }
    this.firestore
      .doc<UnitPhotos>('util/unit-photos')
      .valueChanges()
      .subscribe(
        (unitPhotos) =>
          (this.ytVid = `https://www.youtube-nocookie.com/embed/${unitPhotos.latestOperation}`)
      )
  }
}
