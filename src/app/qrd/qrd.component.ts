import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  templateUrl: './qrd.component.html',
  styleUrls: ['./qrd.component.scss'],
})
export class QRDComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('Quick Refrence Documents - 61st Cavalry Regiment')
  }

  ngOnInit(): void {}
}
