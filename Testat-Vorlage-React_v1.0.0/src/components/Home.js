// @flow

import React from 'react'
import {  withRouter } from 'react-router-dom'
import { Message, Button, Segment, Grid } from 'semantic-ui-react'

export type Props = {
  isAuthenticated: boolean,
}


const Home = withRouter(({history, isAuthenticated}: Props) => (
  <div>
    { isAuthenticated
      ?
        <Grid columns='three' divided>

          <Grid.Row>

            <Grid.Column>
            </Grid.Column>

            <Grid.Column>
              <Segment inverted>
          <Message
              floating
              content={'Willkommen zurück!'}
          />
          <Button inverted fluid
                  onClick={()=>{history.push('/dashboard')}}>Zum Dashborad</Button>
        </Segment>
            </Grid.Column>

            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      :
        <div>
          <Grid columns='three' divided>

            <Grid.Row>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
                <img width={300} src={require('../../res/logo_hsr_2000px.jpg')}/>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
                <img src={require('../../res/Bank.jpg')}/>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
            </Grid.Row>
          </Grid>


        </div>

    }
  </div>
));


export default Home
