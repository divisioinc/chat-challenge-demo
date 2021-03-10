import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Auth } from "aws-amplify";

import { grayLight } from './style-guide/colors'

import Chat from './screens/Chat'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${grayLight};
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  #root {
    height: 100%;
  }
`

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const authenticate = async () => {
      try {
        await Auth.signIn('candidato@divisio.tech', '12345678')
        setAuthenticated(true)
        console.log('logged in')
      } catch (err) {
        console.log('err', err)
      }
    }

    authenticate()
  }, [])

  if (!authenticated) {
    return <div>Authenticating...</div>
  }

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            component={Chat}
          />
          <Route
            path='/conversation/:conversationId'
            component={Chat}
          />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
