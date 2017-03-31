// @flow

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Segment, Button, Divider, Message } from 'semantic-ui-react'

export type Props = {
  isAuthenticated: boolean,
}



const Home = withRouter(({history, isAuthenticated}: Props) => (
  <div>
    { isAuthenticated
      ? <div>
          <Message
              floating
              content={'Willkommen zurück!'}
          />
          <Button primary fluid
                  onClick={()=>{history.push('/dashboard')}}>Zum Dashborad</Button>
        </div>
      :

        <Segment padded>
          <Button primary fluid
                  onClick={()=>{history.push('/login')}}>Einloggen</Button>
          <Divider horizontal>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</Divider>
          <Button secondary fluid
                  onClick={()=>{history.push('/signup')}}>Registrieren</Button>
        </Segment>
    }
  </div>
))


export default Home
