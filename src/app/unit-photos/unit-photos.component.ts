import { Component, OnInit } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  templateUrl: './unit-photos.component.html',
  styleUrls: ['./unit-photos.component.scss'],
})
export class UnitPhotosComponent implements OnInit {
  photos
  constructor(private storage: AngularFireStorage) {
    this.photos = [
      'https://cdn.discordapp.com/attachments/705260260348133437/751966391338270791/20200905165356_1.jpg',
      'https://cdn.discordapp.com/attachments/705260260348133437/751966396174303262/20200905164311_1.jpg',
    ]
  }

  ngOnInit(): void {}
}
