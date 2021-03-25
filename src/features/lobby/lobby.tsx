import React, { useCallback, useEffect, useState } from "react"
import { Button, Loading, Table, Text } from "@geist-ui/react"
import styled from "@emotion/styled"
import { useHistory, useParams } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../user/user.atom"
import { User } from "../../@types"
import { lobbyState } from "./lobby.atom"
import { SocketContext } from "../../components/socket-context/socket.context"
import SocketApi, { SocketOnType } from "../../api/socket-api"
import HttpApi from "../../api/http-api"
import useAsync from "../../hooks/use-async"

const SmallTable = styled.div`
  max-width: min(90vw, 600px);
  justify-content: center;
`

const httpApi = new HttpApi()

export const Lobby = () => {
  const [socket, setSocket] = useState<SocketApi | undefined>()
  const history = useHistory()
  const { lobbyId } = useParams<{ lobbyId: string }>()
  const user = useRecoilValue(userState) as User
  const setLobby = useSetRecoilState(lobbyState)
  const lobby = useRecoilValue(lobbyState)
  const getLobby = useCallback(() => httpApi.getLobby(lobbyId), [lobbyId])
  const { value, status } = useAsync(getLobby)

  useEffect(() => {
    if (status === "success" && value && socket) {
      socket.emit.join({ userId: user.id, lobbyId: value.id })
    }
    if (status === "error") history.push("/")
  }, [value, status, socket])

  useEffect(() => {
    socket?.disconnect()
    const newSocket = new SocketApi({
      [SocketOnType.Update]: setLobby,
    })
    setSocket(newSocket)
    return () => {
      newSocket.disconnect()
      setSocket(undefined)
    }
  }, [lobbyId])

  if (!lobby)
    return (
      <Loading size="large">
        <Text>Loading lobby</Text>
      </Loading>
    )

  const data = lobby.users.map(u => ({
    player: <Text>{u.name}</Text>,
    status: <GeistUser />,
    control: (
      <Button type="error" auto size="mini" disabled={user.id !== lobby.admin.id}>
        Remove
      </Button>
    ),
  }))

  return (
    <>
      <SocketContext.Provider value={socket}>
        <Text h1>
          <Users /> Lobby
        </Text>
        <SmallTable>
          <Table data={data}>
            <Table.Column prop="player" label="player" />
            <Table.Column prop="status" label="status" />
            <Table.Column prop="control" label="control" />
          </Table>
        </SmallTable>
        <Button type="secondary" auto ghost icon={<Play />} onClick={() => history.push("/game")}>
          Start Game
        </Button>
      </SocketContext.Provider>
    </>
  )
}

export default Lobby
