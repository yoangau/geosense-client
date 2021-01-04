import React from "react"
import { Text } from "@geist-ui/react"
import GameMap from "./game-map"

export const Game = () => {
  return (
    <>
      <Text h1>Game</Text>
      <Text small>Time 10</Text>
      <Text small>🇨🇦 Montreal</Text>
      <GameMap />
    </>
  )
}
export default Game
