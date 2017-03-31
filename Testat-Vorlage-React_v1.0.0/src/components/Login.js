// @flow

import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Form, Segment, Button } from 'semantic-ui-react'

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void,
  /* We need to know what page the user tried to access so we can 
     redirect after logging in */
  location: {
    state?: {

      from: string,
    }
  }
}

class Login extends React.Component {
  
  props: Props
  
  state: {
    login: string,
    password: string,
    error?: Error,
    redirectToReferrer: boolean,
  }
  
  state = {
    login: "",
    password: "",
    error: undefined,
    redirectToReferrer: false,
  }

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }

  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, password } = this.state
    this.props.authenticate(login, password, (error) => {
      if(error) {
        this.setState({error})
      } else {
        this.setState({redirectToReferrer: true, error: null})
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer, error } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
        
    return (

      <Segment inverted>
    <h1>Bank of Rapperswil</h1>

      <Form inverted>
    <h2>Login</h2>
      <Form.Group widths='equal'>
        <Form.Input
            label='Login'
            placeholder='Login'
            onChange={this.handleLoginChanged}
            value={this.state.login}/>
        <Form.Input
            label='Password'
            placeholder='Password'
            onChange={this.handlePasswordChanged}
            value={this.state.password}/>
      </Form.Group>
      <Button onClick={this.handleSubmit}>Log-in</Button>
    </Form>
      { error && <p>Es ist ein Fehler aufgetreten!</p> }
    <Link to="/signup">Noch keinen Account?</Link>
    </Segment>


    )
  }
}

export default Login
