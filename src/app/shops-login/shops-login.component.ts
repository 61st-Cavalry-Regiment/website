import { Component, OnInit } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser'
import { AuthService } from '../services/auth/auth.service'

@Component({
  templateUrl: './shops-login.component.html',
  styleUrls: ['./shops-login.component.scss'],
})
export class ShopsLoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  success = false
  errorMessage: string = null
  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private title: Title
  ) {
    this.title.setTitle('Login - 61st Cavalry Regiment')
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        ],
      ],
      rememberMe: [false, []],
    })
    // this.loginForm.valueChanges.subscribe(console.log)
    this.loginForm.valueChanges.subscribe(() => (this.errorMessage = ''))
  }

  get email() {
    return this.loginForm.get('email')
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
    return this.loginForm.get('password')
  }

  get passwordErrorMessage() {
    const password = this.password
    switch (Object.keys(password.errors)[0]) {
      case 'required':
        return 'You need to enter a password.'
      default:
        return ''
    }
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')
  }

  async submitHandler() {
    this.loading = true
    const formValue = this.loginForm.value
    try {
      await this.auth.signIn(
        formValue.email,
        formValue.password,
        formValue.rememberMe
      )
      this.success = true
    } catch (err) {
      let errorCode = err.code
      let errorMessage = err.message
      console.error(errorCode, errorMessage)
      switch (err.code) {
        case 'auth/user-not-found':
          this.errorMessage = 'User not found'
          break
        case 'auth/wrong-password':
          this.errorMessage = 'Incorect Password'
          break
        default:
          this.errorMessage = 'Unkown error, contact Thunder.'
          break
      }
    }
    this.loading = false
  }
}
