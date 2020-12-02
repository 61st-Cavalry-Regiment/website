import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('Page not found - 61st Cavalry Regiment')
  }

  ngOnInit(): void {}
}
