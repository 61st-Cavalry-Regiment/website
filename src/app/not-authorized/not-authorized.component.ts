import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'

@Component({
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss'],
})
export class NotAuthorizedComponent implements OnInit {
  page: any
  constructor(private route: ActivatedRoute, private title: Title) {
    title.setTitle('Not Authorized - 61st Cavalry Regiment')
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.page = params.get('page')
    })
  }
}
