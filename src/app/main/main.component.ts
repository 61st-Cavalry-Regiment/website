import { Component, OnInit } from '@angular/core'
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs'

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  imgUrl: Observable<string | null>
  imgUrl2: Observable<string | null>
  constructor(private storage: AngularFireStorage) {
    const ref = this.storage.ref('home/img_1.jpg')
    this.imgUrl = ref.getDownloadURL()
    this.imgUrl2 = this.storage.ref('home/img_2.jpg').getDownloadURL()
  }

  ngOnInit(): void {}
}
