import React from "react"
import ReactDOM from "react-dom"
import { Global, css } from "@emotion/react"
import { RecoilRoot } from "recoil"
import { App } from "./app/app"
import "@fontsource/roboto-mono"

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        body {
          font-family: "Roboto Mono";
        }
        *,
        *:focus,
        *:hover {
          outline: none;
        }
      `}
    />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root"),
)
