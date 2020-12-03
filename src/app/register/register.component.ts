import { Component, OnInit } from '@angular/core'
import { AngularFireFunctions } from '@angular/fire/functions'
import { threadId } from 'worker_threads'

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private fnc: AngularFireFunctions) {}

  ngOnInit(): void {}
}
