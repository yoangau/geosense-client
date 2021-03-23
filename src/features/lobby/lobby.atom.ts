import { atom } from "recoil"
import { Lobby } from "../../@types"
import HttpApi from "../../api/http-api"

export const httpApi = new HttpApi()

export const lobbyState = atom<Lobby | undefined>({
  key: "lobby-state",
  default: undefined,
})
