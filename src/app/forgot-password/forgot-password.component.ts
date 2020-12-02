import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    if (Object.keys(route.snapshot.queryParams).length > 0) {
      console.log('do smthn')
    }
  }

  ngOnInit(): void {}
}
