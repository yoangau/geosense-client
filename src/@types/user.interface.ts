import { Lobby } from "./lobby.interface"

export type UserSignUpParams = {
  name: string
  color: string
}

export interface UserSignUpResponse {
  user: User
  token: string
}

export interface User {
  id: string
  color: string
  dateCreated: string
  games?: any[]
  adminLobbies?: any[]
  lobbies?: Lobby[]
  isActive: boolean
}
