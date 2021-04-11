import { animate, state, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../services/auth/auth.service'
import { StateService } from '../services/state.service'
@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [
    trigger('visableHidden', [
      state(
        'visable',
        style({
          opacity: 1,
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0,
        })
      ),
      state(
        'fullyHidden',
        style({
          display: 'none',
        })
      ),
      transition('visable => hidden, hidden => fullyHidden', [animate('1s')]),
      transition('hidden => visable', [animate('0.5s')]),
    ]),
    trigger('insertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', animate('200ms', style({ opacity: 0 }))),
    ]),
  ],
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup
  passwordForm: FormGroup
  state: boolean
  form: boolean = true
  stage: string = 'one'
  constructor(
    private route: ActivatedRoute,
    private _state: StateService,
    private _afAuth: AngularFireAuth,
    private auth: AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.state = !!this._state.userMgmnt
    console.log(this._state.userMgmnt)
    if (this._state.userMgmnt) {
      console.log('do smthn')
    }
  }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
    this.passwordForm = this.fb.group({ password: ['', [Validators.required]] })
    // this.emailForm.valueChanges.subscribe(console.log)
  }

  get email() {
    return this.emailForm.get('email')
  }

  get emailErrorMessage() {
    const email = this.email
    // console.log(email.errors, Object.keys(email.errors))

    switch (Object.keys(email.errors)[0]) {
      case 'required':
        return 'You need to enter an email.'

      case 'email':
        return 'Not a valid email.'
      default:
        return ''
    }
  }

  get password() {
    return this.passwordForm.get('password')
  }

  get passwordErrorMessage() {
    const password = this.password
    switch (Object.keys(password.errors)[0]) {
      case 'required':
        return 'You need to enter a password'
      default:
        return ''
    }
  }

  async submitHandler(state: string) {
    // console.log(state, this.emailForm.value, this.passwordForm.value)
    switch (state) {
      case 'email':
        this.form = false
        await this._afAuth.sendPasswordResetEmail(this.emailForm.value.email)
        this.stage = 'two'
        break

      case 'password':
        this._afAuth
          .verifyPasswordResetCode(this._state.userMgmnt.oobCode)
          .then((email) => {
            var accountEmail = email
            this._afAuth
              .confirmPasswordReset(
                this._state.userMgmnt.oobCode,
                this.password.value
              )
              .then((resp) => {
                this.auth.signIn({ email, password: this.password.value })
              })
          })
          .catch((error) => {
            this._snackBar.open(error, 'Close', {
              duration: 5000,
              panelClass: ['warn'],
            })
          })
        break

      default:
        break
    }
  }
}
