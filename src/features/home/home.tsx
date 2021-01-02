import React from "react"
import { Text, Button } from "@geist-ui/react"
import { MapPin, Map, Shuffle } from "@geist-ui/react-icons"
import styled from "@emotion/styled"

const SimpleButton = styled(Button)`
  margin-bottom: 5px;
`

export const Home = () => (
  <>
    <Text h1>
      <MapPin /> Geosense
    </Text>
    <SimpleButton type="secondary" ghost icon={<Map />}>
      Create A Game
    </SimpleButton>
    <SimpleButton type="secondary" ghost icon={<Shuffle />}>
      Random game
    </SimpleButton>
  </>
)

export default Home
