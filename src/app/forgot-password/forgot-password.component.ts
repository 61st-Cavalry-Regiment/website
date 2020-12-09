import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../services/auth/auth.service'
import { StateService } from '../services/state.service'

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup
  password: FormGroup
  state: boolean
  constructor(
    private route: ActivatedRoute,
    private _state: StateService,
    private _afAuth: AngularFireAuth,
    private auth: AuthService,
    private fb: FormBuilder
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
    this.password = this.fb.group({ password: [''] })
    this.emailForm.valueChanges.subscribe(console.log)
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

  submitHandler(state: string) {
    console.log(state, this.emailForm.value)
  }
}
