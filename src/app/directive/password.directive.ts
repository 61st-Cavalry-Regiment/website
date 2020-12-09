import { Directive } from '@angular/core'
import {
  AbstractControl,
  Form,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms'

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const pw1 = control.get('password')
    const pw2 = control.get('passwordRepeat')
    return pw1 && pw2 && pw1.value == pw2.value ? { passwordMatch: true } : null
  }
}
