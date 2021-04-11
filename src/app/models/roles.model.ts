export interface roles {
  admin: role
  website: role
}

export interface role {
  access: boolean
  lead?: boolean
}
