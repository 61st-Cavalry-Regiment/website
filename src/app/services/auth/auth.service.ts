import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { Observable, of, Subscription } from 'rxjs'
import { User } from 'src/app/models/user.model'
import { map, switchMap } from 'rxjs/operators'
import * as firebase from 'firebase'
import { Code, Codes } from 'src/app/models/codes.model'
import { v4 as uuidv4 } from 'uuid'
import { trace } from '@angular/fire/performance'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User> = of(null)
  redirectUrl: string
  isLoggedIn: boolean
  user: Subscription | null

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.user = auth.authState
      .pipe(
        trace('auth'),
        map((u) => !!u)
      )
      .subscribe((isLoggedIn) => (this.isLoggedIn = isLoggedIn))
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.isLoggedIn = true
        this.user$ = this.fireStore
          .doc<User>(`users/${user.uid}`)
          .valueChanges()
        console.log(this.isLoggedIn)
        this.user$.subscribe(console.log)
      } else {
        this.isLoggedIn = false
      }
    })
    this.user$.subscribe(console.log)
  }

  async signOut() {
    await this.auth.signOut()
    this.isLoggedIn = false
    return this.router.navigate(['/'])
  }

  signIn(email: string, password: string) {
    this.isLoggedIn = true
    // this.auth
    //   .setPersistence(this.auth.)
    //   .then(() => {
    //     return this.auth.signInWithEmailAndPassword(email, password)
    //   })
    //   .catch((err) => {
    //     let errorCode = err.code
    //     let errorMessage = err.message
    //     console.error(errorCode, errorMessage)
    //   })
    this.auth.signInWithEmailAndPassword(email, password)
    return this.router.navigateByUrl(this.redirectUrl)
  }

  register(email: string, password: string, code: string) {
    this.fireStore
      .collection<Code>('codes', (ref) => ref.where('code', '==', code))
      .snapshotChanges()
      .subscribe((codes) => {
        if (codes.length == 1) {
          // this.auth.createUserWithEmailAndPassword(email, password)
          console.log(true)
          return this.signIn(email, password)
        } else {
        }
      })
  }

  async generateCode() {
    this.user$.subscribe((user) => {
      this.fireStore.collection<Code>('codes').add({
        code: uuidv4().split('-')[0],
        createdBy: user.firstInitial + '.' + user.lastName,
      })
    })
  }
}
