import { Inject } from '@angular/core'
import { Component, OnInit } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  templateUrl: './img-view.component.html',
  styleUrls: ['./img-view.component.scss'],
})
export class ImgViewComponent implements OnInit {
  loaded: boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // var image = document.querySelector('img')
    // this.loaded = image.complete && image.naturalHeight !== 0
  }

  ngOnInit(): void {}
}

interface DialogData {
  img: string
}
