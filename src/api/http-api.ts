import { ApisauceInstance, create, RequestTransform } from "apisauce"
import { Lobby, User, UserSignUpParams, UserSignUpResponse } from "../@types"
import { getUserToken, setUserToken } from "../helpers/local-storage"

export default class HttpApi {
  private apisauce: ApisauceInstance

  private static requestTransform: RequestTransform = request => {
    const userToken = getUserToken()
    request.headers.Authorization = `Bearer ${userToken}`
  }

  constructor() {
    this.apisauce = create({
      baseURL: "http://localhost:3001",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
      },
    })
    this.apisauce.addRequestTransform(HttpApi.requestTransform)
  }

  async signUp(userInfo: UserSignUpParams): Promise<User | undefined> {
    const response = await this.apisauce.post<UserSignUpResponse>("/user", userInfo)
    if (!response.ok || !response.data) return
    const { user, token } = response.data
    setUserToken(token)
    return user
  }

  async getUser(): Promise<User | undefined> {
    const response = await this.apisauce.get<User>("/user")
    if (response.ok) return response.data
  }

  async createLobby(userId: string): Promise<Lobby | undefined> {
    return (await this.apisauce.post<Lobby>("/lobby", { adminId: userId })).data
  }
}
