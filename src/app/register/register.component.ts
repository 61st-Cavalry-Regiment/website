import { Component, OnInit } from '@angular/core'
import { AngularFireFunctions } from '@angular/fire/functions'
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Title } from '@angular/platform-browser'
import { ConfirmedValidator } from '../confirmed.validator'
import { passwordValidator } from '../directive/password.directive'
import { AuthService } from '../services/auth/auth.service'

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  passwordForm: FormGroup
  errorMessage: string
  constructor(
    private _fnc: AngularFireFunctions,
    private auth: AuthService,
    private _fb: FormBuilder,
    private _title: Title,
    private _snackBar: MatSnackBar
  ) {
    _title.setTitle('Register - 61st Calvalry Regiment')
  }

  ngOnInit(): void {
    this.passwordForm = this._fb.group(
      {
        password: ['password', [Validators.required]],
        passwordRepeat: ['password', [Validators.required]],
      },
      { validator: ConfirmedValidator('password', 'passwordRepeat') }
    )
    this.registerForm = this._fb.group({
      email: ['hi@hi.com', [Validators.required, Validators.email]],
      password: this.passwordForm,
      firstInitial: ['x', [Validators.maxLength(1)]],
      lastName: ['dover'],
      nickName: ['Thunder'],
      code: ['123456'],
    })
    this.registerForm.valueChanges.subscribe(() => (this.errorMessage = ''))
  }

  get email() {
    return this.registerForm.get('email')
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
        return 'You need to enter a password.'
      default:
        return ''
    }
  }
  get passwordConfirm() {
    return this.passwordForm.get('passwordRepeat')
  }

  get passwordConfirmErrorMessage() {
    const password = this.passwordConfirm
    switch (Object.keys(password.errors)[0]) {
      case 'confirmedValidator':
        return 'Passwords do not match.'
      default:
        return ''
    }
  }

  get name() {
    return {
      firstInitial: this.registerForm.get('firstInitial'),
      lastName: this.registerForm.get('lastName'),
      nickName: this.registerForm.get('nickName'),
    }
  }

  get firstInitialErrorMessage() {
    const control = this.name.firstInitial
    console.log(Object.keys(control.errors)[0])

    switch (Object.keys(control.errors)[0]) {
      case 'maxlength':
        return 'First inital should be one character.'
      case 'required':
        return 'Please provide a first inital.'
      default:
        return ''
    }
  }

  get code() {
    return this.registerForm.get('code')
  }

  async submitHandler() {
    const formValue: formValue = this.registerForm.value
    formValue.firstInitial = formValue.firstInitial.toUpperCase()
    formValue.lastName = formValue.lastName.capitalize()
    const callable = this._fnc.httpsCallable('combineName')
    callable({
      name: {
        firstInital: formValue.firstInitial,
        lastName: formValue.lastName,
        nickName: formValue.nickName,
      },
    }).subscribe((res) => {
      try {
        this.auth.register(
          formValue.email,
          formValue.password.password,
          formValue.code,
          {
            firstInital: formValue.firstInitial,
            lastName: formValue.lastName,
            nickName: formValue.nickName,
            displayName: res.displayName,
          }
        )
      } catch (err) {
        let errorCode = err.code
        let errorMessage = err.message
        console.error(errorCode, errorMessage)
        this._snackBar.open(errorMessage, 'Close', {
          duration: 5000,
        })
      }
    })
  }
}

interface formValue {
  email: string
  password: {
    password: string
  }
  code: string
  firstInitial: string
  lastName: string
  nickName: string
}
