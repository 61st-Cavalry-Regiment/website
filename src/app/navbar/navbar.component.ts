import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: Observable<boolean>
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn
  }

  logout() {
    this.auth.signOut()
  }
}
