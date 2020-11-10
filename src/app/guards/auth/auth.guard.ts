import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { AuthService } from 'src/app/services/auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url: string = state.url
    return this.checkLogin(url)
  }

  checkLogin(url: string): true | UrlTree {
    let toReturn
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        toReturn = true
      } else {
        this.authService.redirectUrl = url
        toReturn = this.router.parseUrl('/login')
      }
    })
    return toReturn
  }
}
