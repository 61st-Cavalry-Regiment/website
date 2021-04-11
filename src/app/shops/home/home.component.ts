import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Observable, of } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: Observable<User> = of({ displayName: '' })
  constructor(private title: Title, private auth: AuthService) {
    this.title.setTitle('Shops - 61st Cavalry Regiment')
  }

  ngOnInit(): void {
    this.user = this.auth.user$
  }
}
