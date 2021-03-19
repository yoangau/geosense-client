import React from "react"
import { Text, Button } from "@geist-ui/react"
import { MapPin, Map, Globe as GlobeIcon } from "@geist-ui/react-icons"
import styled from "@emotion/styled"
import { useHistory } from "react-router-dom"
import Globe from "./globe"

const SimpleButton = styled(Button)`
  margin-top: 5px;
`

export const Home = () => {
  const history = useHistory()

  return (
    <>
      <Text h1>
        <MapPin /> Geosense
      </Text>
      <Globe />
      <SimpleButton type="secondary" ghost icon={<Map />} onClick={() => history.push("/lobby")}>
        Create A Group
      </SimpleButton>
      <SimpleButton type="secondary" ghost icon={<GlobeIcon />}>
        Free For All
      </SimpleButton>
    </>
  )
}

export default Home
