import React from "react"
import { Button, Table, Text } from "@geist-ui/react"
import { Users, User as GeistUser, UserCheck, Play } from "@geist-ui/react-icons"
import styled from "@emotion/styled"
import { useHistory, useParams } from "react-router-dom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "../user/user.atom"
import HttpApi from "../../api/http-api"
import { User } from "../../@types"
import { lobbyState } from "./lobby.atom"

const SmallTable = styled.div`
  max-width: min(90vw, 600px);
  justify-content: center;
`

const httpApi = new HttpApi()

export const Lobby = () => {
  const history = useHistory()
  const { lobbyId } = useParams<{ lobbyId: string | undefined }>()
  const user = useRecoilValue(userState) as User
  const lobby = useRecoilValue(lobbyState)
  const setLobby = useSetRecoilState(lobbyState)

  if (!lobbyId && !lobby) {
    httpApi.createLobby(user.id).then(lob => {
      setLobby(lob)
      history.replace(`/lobby/${lob?.id}`)
    })
  }

  console.log(lobby)

  const data = [
    {
      player: <Text>Yoan</Text>,
      status: <GeistUser />,
      control: (
        <Button type="error" auto size="mini" disabled>
          Remove
        </Button>
      ),
    },
    {
      player: "Anes",
      status: <UserCheck />,
      control: (
        <Button type="error" auto size="mini">
          Remove
        </Button>
      ),
    },
    {
      player: "David",
      status: <GeistUser />,
      control: (
        <Button type="error" auto size="mini">
          Remove
        </Button>
      ),
    },
  ]
  return (
    <>
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
    </>
  )
}

export default Lobby
