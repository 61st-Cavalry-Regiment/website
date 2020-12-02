import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { map, switchMap, tap } from 'rxjs/operators'
import { Code } from 'src/app/models/codes.model'
import { v4 as uuidv4 } from 'uuid'
import * as firebase from 'firebase/app'
import { roles } from 'src/app/models/roles.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>
  redirectUrl: string

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.getUser()
  }

  async signOut() {
    await this.auth.signOut()
    this.user$ = this.getUser()
    return this.router.navigateByUrl('/')
  }

  async signIn(email: string, password: string, remember: boolean = false) {
    await this.auth.signInWithEmailAndPassword(email, password)
    this.user$ = this.getUser()
    return this.router.navigateByUrl(this.redirectUrl)
  }

  register(email: string, password: string, code: string) {}

  async generateCode(access: roles) {
    const code = uuidv4()
    this.user$.subscribe((user) => {
      this.fireStore
        .collection<Code>('codes')
        .doc<Code>(code)
        .set({
          code: code,
          createdBy: `${user.firstInitial}.${user.lastName} "${user.userName}"`,
          access: access,
        })
    })
  }

  deleteCode(code: Code) {
    this.fireStore.doc<Code>(`codes/${code.code}`).delete()
  }

  get isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user))
  }

  private getUser(): Observable<User> {
    return this.auth.authState.pipe(
      switchMap((user) => {
        if (!!user) {
          console.log('Found User')
          return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges()
        }
        return of(null)
      })
    )
  }
}
