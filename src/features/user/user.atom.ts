import { atom, selector } from "recoil"
import { User } from "../../@types"
import HttpApi from "../../api/http-api"

export const httpApi = new HttpApi()

export const userState = atom<User | undefined>({
  key: "user-state",
  default: selector({
    key: "user-state/default",
    get: () => httpApi.getUser(),
  }),
})
