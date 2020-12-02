import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.scss'],
})
export class GenerateCodeComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      admin: false,
      website: false,
    })
    this.form.valueChanges.subscribe(console.log)
  }
}
