import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable, of } from 'rxjs'
import { UnitPhotos } from 'src/app/models/unit-photos.model'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss'],
})
export class WebsiteComponent implements OnInit {
  user: Observable<User>
  unitPhotos: UnitPhotos
  imgs: Observable<string>[] = [of('')]
  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.user = auth.user$
  }

  ngOnInit(): void {
    this.firestore
      .doc<UnitPhotos>('util/unit-photos')
      .valueChanges()
      .subscribe((unitPhotos) => (this.unitPhotos = unitPhotos))
    for (let index = 0; index < 5; index++) {
      this.imgs[index] = this.storage
        .ref(`unit-photos/img_${index + 1}.jpg`)
        .getDownloadURL()
    }
  }
}
