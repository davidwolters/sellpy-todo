const isURL = string => {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === "http:" || url.protocol === "https:"
}

const validations = {
  REACT_APP_API_URL: value => isURL
}

let config

const validateEnvironment = environment => {
  for (let key in validations) {
    if (!validations[key](environment.key)) {
      throw new Error(`Environment variable ${key} is not set or is not valid`)
    }
  }
}

export const loadEnvironmentConfig = environment => {
  validateEnvironment(environment)
  config = {
    apiURL: environment.REACT_APP_API_URL
  }
}

const getConfig = () => config
export default getConfig
