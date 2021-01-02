import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Global, css } from "@emotion/react"
import App from "./app/app"
import { store } from "./app/store"
import * as serviceWorker from "./serviceWorker"
import "@fontsource/roboto-mono"

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        body {
          font-family: "Roboto Mono";
        }
      `}
    />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
