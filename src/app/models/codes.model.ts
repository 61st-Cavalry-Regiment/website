import { roles } from './roles.model'

export interface Codes {
  codes: Code[]
}

export interface Code {
  createdBy?: string
  code: string
  access: roles
}
