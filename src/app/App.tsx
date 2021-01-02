import React from "react"
import { HashRouter as Router, Switch, Route } from "react-router-dom"

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" />
      </Switch>
    </Router>
  )
}

export default App
