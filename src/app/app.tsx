import React, { Suspense } from "react"
import { HashRouter as Router, Switch, Route } from "react-router-dom"
import styled from "@emotion/styled"
import { Home, Group, Game } from "../features"
import { AuthRoute } from "../features/auth/auth-route"
import DebugObserver from "../helpers/debug-observer"

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
      <DebugObserver />
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Switch>
            <AuthRoute path="/lobby" component={Group} />
            <AuthRoute path="/game" component={Game} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </Suspense>
    </AppContainer>
  )
}

export default App
