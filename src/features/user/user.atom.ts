import { atom, selector } from "recoil"
import { User } from "../../@types"
import UserApi from "../../api/http-api"

export const userApi = new UserApi()

export const userState = atom<User | undefined>({
  key: "user-state",
  default: selector({
    key: "user-state/default",
    get: () => userApi.getUser(),
  }),
})
