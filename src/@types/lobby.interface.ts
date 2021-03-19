import { User } from "./user.interface"

export interface Lobby {
  id: string
  admin: User
  users: User[]
  games: any[]
}
