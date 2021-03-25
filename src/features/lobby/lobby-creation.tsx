import React, { useCallback } from "react"
import { Loading, Text } from "@geist-ui/react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Redirect } from "react-router-dom"
import { lobbyState } from "./lobby.atom"
import HttpApi from "../../api/http-api"
import { User } from "../../@types"
import { userState } from "../user/user.atom"
import useAsync from "../../hooks/use-async"

const httpApi = new HttpApi()

export const LobbyCreation = () => {
  const setLobby = useSetRecoilState(lobbyState)
  const user = useRecoilValue(userState) as User

  const createLobby = useCallback(async () => {
    const lobby = await httpApi.createLobby(user.id)
    setLobby(lobby)
    return lobby
  }, [user])
  const { status, value } = useAsync(createLobby)

  if (status === "error") return <Redirect to="/" />
  if (status === "success" && value) {
    return <Redirect to={`/lobby/${value.id}`} />
  }

  return (
    <Loading size="large">
      <Text>Creating lobby</Text>
    </Loading>
  )
}

export default LobbyCreation
