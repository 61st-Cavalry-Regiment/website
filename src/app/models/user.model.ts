import { roles } from './roles.model'

export interface User {
  uid?: string
  email?: string
  userName?: string
  roles?: roles
  displayName?: string
}
