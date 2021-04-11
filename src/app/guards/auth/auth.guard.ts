import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, switchMap, take, tap } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private login: UrlTree
  private dash: UrlTree
  constructor(
    private auth: AuthService,
    private router: Router,
    private _afAuth: AngularFireAuth
  ) {
    this.login = this.router.parseUrl('login')
    this.dash = this.router.parseUrl('shops')
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.auth.isLoggedIn.subscribe(console.log)
    const url: string = state.url
    return this.auth.isLoggedIn.pipe(
      map((isLoggedIn) => {
        console.log('Guard start')
        console.log('Loggin State:', isLoggedIn)
        if (isLoggedIn) {
          if (route.routeConfig.path === 'login') {
            console.log('Logged in, path is login page')
            return this.router.navigateByUrl('/shops')
          }
          console.log('Guard Passed')
          return true
        } else {
          if (route.routeConfig.path === 'login') {
            console.log('Guard Passed to login page')
            return true
          }
          console.log(
            'Guard failed, redirecting to login page. Redirect url:',
            url
          )
          this.auth.redirectUrl = url
          return this.router.navigateByUrl('/login')
        }
      })
    )
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    if (route.routeConfig.path === 'home') {
      return true
    }
    return this.auth.user$.pipe(
      map((user) => {
        console.log(user.roles)

        console.log('Child Guard Start')
        if (user.roles[route.routeConfig.path].access) {
          console.log('Guard Passed')
          return true
        }
        console.log('Guard Failed')
        return this.router.navigateByUrl(
          this.parseUrl(
            state.url,
            `../not-authorized/${route.routeConfig.path}`
          )
        )
      })
    )
  }

  private parseUrl(url: string, redirectTo: string) {
    const urlTokens = url.split('/')
    const redirectToTokens = redirectTo.split('/')

    let token = redirectToTokens.shift()

    while (token) {
      if (token !== '.' && token !== '..') {
        redirectToTokens.unshift(token)
        break
      }

      if (token === '..') {
        urlTokens.pop()
      }

      token = redirectToTokens.shift()
    }

    urlTokens.push(...redirectToTokens)

    return urlTokens.join('/')
  }
}
