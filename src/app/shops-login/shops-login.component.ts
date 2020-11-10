import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AuthService } from '../services/auth/auth.service'

@Component({
  templateUrl: './shops-login.component.html',
  styleUrls: ['./shops-login.component.scss'],
})
export class ShopsLoginComponent implements OnInit {
  constructor(public auth: AuthService) {
    // auth.signIn('x.dover@61st-regiment.com', '123456')
  }

  ngOnInit(): void {}

  login(email: string, pass: string) {
    this.auth.signIn(email, pass)
  }

  register(email: string, pass: string, code: string) {
    this.auth.register(email, pass, code)
  }
}
