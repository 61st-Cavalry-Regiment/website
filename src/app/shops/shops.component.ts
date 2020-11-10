import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { Code, Codes } from '../models/codes.model'
import { User } from '../models/user.model'
import { AuthService } from '../services/auth/auth.service'

@Component({
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit {
  codes: Code[]
  constructor(public auth: AuthService, private fireStore: AngularFirestore) {
    fireStore
      .collection<Code>('codes')
      .valueChanges()
      .subscribe((codes) => (this.codes = codes))
  }

  ngOnInit(): void {}

  test() {
    console.log(this.codes)
  }

  generate() {
    this.auth.generateCode()
  }
}
