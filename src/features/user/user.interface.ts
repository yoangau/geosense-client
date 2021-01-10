export interface UserRegisterInfo {
  name: string
  color: string
}

export interface User {
  id: number
  color: string
  dateCreated: Date
  games: any[]
  adminGroups: any[]
  groups: any[]
  isActive: boolean
}

export interface UserState {
  user?: User
  loading: boolean
  error?: string
}
