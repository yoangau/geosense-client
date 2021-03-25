import React, { useCallback, useEffect, useState } from "react"
import { Button, Loading, Table, Text } from "@geist-ui/react"
import { Users, User as GeistUser, Play, Shield } from "@geist-ui/react-icons"
import styled from "@emotion/styled"
import { useHistory, useParams } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../user/user.atom"
import { Lobby as LobbyType, User } from "../../@types"
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
    if (status === "error" || (status === "success" && !value)) history.push("/")
  }, [value, status, socket])

  useEffect(() => {
    socket?.disconnect()
    const newSocket = new SocketApi({
      [SocketOnType.Update]: (l: LobbyType | undefined) => {
        setLobby(l)
        if (!l?.users.find(u => u.id === user.id)) history.push("/")
      },
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

  const adminId = lobby.admin.id
  const isAdmin = user.id === adminId

  const data = lobby.users.map(u => ({
    player: <Text style={{ color: u.color }}>{u.name}</Text>,
    status: u.id === adminId ? <Shield /> : <GeistUser />,
    control: (
      <Button
        type="error"
        auto
        size="mini"
        disabled={!isAdmin || u.id === adminId}
        onClick={() => socket?.emit.remove({ userId: u.id, adminId: user.id, lobbyId })}
      >
        Remove
      </Button>
    ),
  }))

  return (
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
      {isAdmin && (
        <Button type="secondary" auto ghost icon={<Play />} onClick={() => history.push("/game")}>
          Start Game
        </Button>
      )}
    </SocketContext.Provider>
  )
}

export default Lobby
