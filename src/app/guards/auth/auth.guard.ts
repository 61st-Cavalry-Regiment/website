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
import { map, take, tap } from 'rxjs/operators'
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
    return this.authService.isLoggedIn.pipe(
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          console.log('access denied')
          this.authService.redirectUrl = url
          this.router.navigate(['/login'])
        }
      })
    )
  }
}
