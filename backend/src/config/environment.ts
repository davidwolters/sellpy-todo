import { EnvironmentConfig } from "src/typedefs/config"

let config: EnvironmentConfig

// Make sure port is a number
const validations = {
  PORT: (value: any) => +value !== NaN
}

const validateEnvironment = (environment: any) => {
  for (let key in validations) {
    if (!validations[key](environment[key])) {
      throw `Environment variable ${key} is not set or is not valid.`
    }
  }
}

export const loadEnvironmentConfig = (environment: any) => {
  validateEnvironment(environment)

  config = {
    port: environment.PORT
  }
}

export default () => config
