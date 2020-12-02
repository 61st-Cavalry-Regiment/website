import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss'],
})
export class RecruitmentComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('Recruitment - 61st Cavalry Regiment')
  }

  ngOnInit(): void {}
}
