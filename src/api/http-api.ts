import { ApiResponse, ApisauceInstance, create } from "apisauce"
import { User, UserRegisterInfo } from "../features/user/user.slice"

export default class UserApi {
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

  async register(userInfo: UserRegisterInfo): Promise<ApiResponse<User>> {
    return this.apisauce.post("/user", userInfo)
  }
}