export type UserSignUpParams = {
  name: string
  color: string
}

export interface User {
  id: string
  color: string
  dateCreated: string
  games?: any[]
  adminGroups?: any[]
  groups?: any[]
  isActive: boolean
}
