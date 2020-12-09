import { roles } from './roles.model'

export interface User {
  uid?: string
  email?: string
  firstInitial?: string
  lastName?: string
  userName?: string
  roles?: roles
  displayName?: string
}
