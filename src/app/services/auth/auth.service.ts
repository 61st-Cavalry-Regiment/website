import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { map, switchMap, take, tap } from 'rxjs/operators'
import { Code } from 'src/app/models/codes.model'
import { v4 as uuidv4 } from 'uuid'
import * as firebase from 'firebase/app'
import { roles } from 'src/app/models/roles.model'
import { UserAuthInfo } from 'src/app/models/authInfo.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>
  redirectUrl: string

  constructor(
    private _fAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.getUser()
  }

  async signOut() {
    await this._fAuth.signOut()
    this.user$ = this.getUser()
    return this.router.navigateByUrl('/')
  }

  async signIn(authInfo: UserAuthInfo) {
    await this._fAuth.signInWithEmailAndPassword(
      authInfo.email,
      authInfo.password
    )
    this.user$ = this.getUser()
    return this.router.navigateByUrl(this.redirectUrl)
  }

  async register(
    email: string,
    password: string,
    code: string,
    nickName: string
  ) {
    code = code.toLowerCase()
    let codeDoc = await this.fireStore
      .doc<Code>(`codes/${code}`)
      .get()
      .toPromise()
    console.log(codeDoc.get('access'))

    if (codeDoc.exists) {
      console.log('found code')
      let user = await this._fAuth.createUserWithEmailAndPassword(
        email,
        password
      )
      const data$: User = {
        uid: user.user.uid,
        userName: nickName,
        displayName: nickName,
        roles: codeDoc.get('access'),
      }
      console.log('data', data$)
      this.fireStore.collection<User>('users').doc(user.user.uid).set(data$)
      codeDoc.ref.delete()
      return
    } else {
      throw 'Code not found'
    }
    //check code
    this.fireStore
      .collection<Code>('codes', (ref) => ref.where('code', '==', code))
      .valueChanges()
      .pipe(
        take(1),
        map((doc) => doc[0]),
        tap((doc) => {
          // console.log(doc)
          if (doc) {
            //create user
            this._fAuth
              .createUserWithEmailAndPassword(email, password)
              .then((user) => {
                console.log(email, password, code, name)
                const data$: User = {
                  uid: user.user.uid,
                  userName: nickName,
                  displayName: nickName,
                  roles: doc.access,
                }
                // console.log('user object', data$)
                this.fireStore
                  .collection('users')
                  .doc<User>(user.user.uid)
                  .set(data$)
                this.fireStore.doc(`codes/${doc.code}`).delete()
              })
          } else {
            throw new Error('Code not found')
          }
        })
      )
      .subscribe()
  }

  async generateCode(access: roles) {
    const code = uuidv4()
    this.user$.subscribe((user) => {
      this.fireStore
        .collection<Code>('codes')
        .doc<Code>(code)
        .set({
          code: code,
          createdBy: `${user.userName}`,
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
    return this._fAuth.authState.pipe(
      switchMap((user) => {
        if (!!user) {
          console.log('Found User', user.email)
          return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges()
        }
        return of(null)
      })
    )
  }
}
