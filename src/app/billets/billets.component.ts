import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  templateUrl: './billets.component.html',
  styleUrls: ['./billets.component.scss'],
})
export class BilletsComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('Billets - 61st Cavalry Regiment')
  }

  ngOnInit(): void {}
}
