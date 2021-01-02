import React from "react"
import { Button, Table, Text } from "@geist-ui/react"
import { Users, User, UserCheck, Play } from "@geist-ui/react-icons"
import styled from "@emotion/styled"
import { useHistory } from "react-router-dom"

const SmallTable = styled.div`
  max-width: min(90vw, 600px);
  justify-content: center;
`

export const Lobby = () => {
  const history = useHistory()

  const data = [
    {
      player: <Text>Yoan</Text>,
      status: <User />,
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
      status: <User />,
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
