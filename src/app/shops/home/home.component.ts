import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('Shops - 61st Cavalry Regiment')
  }

  ngOnInit(): void {}
}
