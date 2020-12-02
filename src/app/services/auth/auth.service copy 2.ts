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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>
  redirectUrl: string

  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }

  async signOut() {
    await this.auth.signOut()
    this.user$ = of(null)
    return this.router.navigate(['/'])
  }

  async signIn(email: string, password: string, remember: boolean = false) {
    if (remember) {
      await this.auth.setPersistence(
        firebase.default.auth.Auth.Persistence.LOCAL
      )
      await this.auth.signInWithEmailAndPassword(email, password)
      this.user$ = this.auth.authState.pipe(
        switchMap((user) => {
          if (user) {
            return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      )
      return this.router.navigateByUrl(this.redirectUrl)
    } else {
      await this.auth.setPersistence(
        firebase.default.auth.Auth.Persistence.SESSION
      )
      await this.auth.signInWithEmailAndPassword(email, password)
      this.user$ = this.auth.authState.pipe(
        switchMap((user) => {
          if (user) {
            return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        })
      )
      return this.router.navigateByUrl(this.redirectUrl)
    }
    // if (!remember) {
    //   console.log('session')

    //   this.auth.setPersistence('session').then(() => {
    //     this.auth.signInWithEmailAndPassword(email, password)
    //     this.user$ = this.auth.authState.pipe(
    //       switchMap((user) => {
    //         if (user) {
    //           return this.fireStore
    //             .doc<User>(`users/${user.uid}`)
    //             .valueChanges()
    //         } else {
    //           return of(null)
    //         }
    //       })
    //     )
    //   })
    // } else {
    //   console.log('local')

    //   this.auth.setPersistence('local').then(() => {
    //     this.auth.signInWithEmailAndPassword(email, password)
    //     this.user$ = this.auth.authState.pipe(
    //       switchMap((user) => {
    //         if (user) {
    //           return this.fireStore
    //             .doc<User>(`users/${user.uid}`)
    //             .valueChanges()
    //         } else {
    //           return of(null)
    //         }
    //       })
    //     )
    //   })
    // }
    // this.isLoggedIn.subscribe(console.log)
    // return this.router.navigateByUrl(this.redirectUrl)
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

  get isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => !!user),
      tap((isLoggedIn) => isLoggedIn)
    )
  }
}
