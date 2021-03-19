import { ApisauceInstance, create } from "apisauce"
import { Lobby, User, UserSignUpParams } from "../@types"
import { getUserId, setUserId } from "../helpers/local-storage"

export default class HttpApi {
  private apisauce: ApisauceInstance

  constructor() {
    this.apisauce = create({
      baseURL: "http://localhost:3001",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  async signUp(userInfo: UserSignUpParams): Promise<User | undefined> {
    const user = (await this.apisauce.post<User>("/user", userInfo)).data
    if (user) setUserId(user.id)
    return user
  }

  async getUser(): Promise<User | undefined> {
    const userId = getUserId()
    return (await this.apisauce.get<User>("/user", { id: userId })).data
  }

  async createLobby(userId: string): Promise<Lobby | undefined> {
    return (await this.apisauce.post<Lobby>("/lobby", { adminId: userId })).data
  }
}
