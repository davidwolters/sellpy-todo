import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { loadEnvironmentConfig } from "./config/environment"
import registerServiceWorker from "./registerServiceWorker"
import dotenv from "dotenv"

console.log(
  dotenv.config({
    path: __dirname + "./../.env"
  })
)

loadEnvironmentConfig(process.env)
ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
