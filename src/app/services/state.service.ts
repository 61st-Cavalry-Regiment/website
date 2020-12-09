import { Injectable } from '@angular/core'
import { userMgmnt } from '../models/userMgmnt.model'

@Injectable({
  providedIn: 'root',
})
export class StateService {
  data: any
  userMgmnt: userMgmnt

  constructor() {}
}
