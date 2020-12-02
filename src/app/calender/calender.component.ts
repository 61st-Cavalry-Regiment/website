import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('Calander - 61st Cavalry Regiment')
  }

  ngOnInit(): void {}
}
