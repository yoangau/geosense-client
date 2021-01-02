import React from "react"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import styled from "@emotion/styled"
import { Home, Lobby, Game } from "../features"

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  max-height: 100vh;
  height: 95vh;
`

export const App = () => {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route path="/lobby" component={Lobby} />
          <Route path="/game" component={Game} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </AppContainer>
  )
}

export default App
