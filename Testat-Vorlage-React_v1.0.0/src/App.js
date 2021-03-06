// @flow

import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    withRouter
} from 'react-router-dom'

import {Menu} from 'semantic-ui-react'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import AllTransactions from './components/AllTransactions'
import PrivateRoute from './components/PrivateRoute'


import * as api from './api'

import type { User } from './api'

class App extends React.Component {

    state: {
        isAuthenticated: boolean,
        token: ?string,
        user: ?User,
        activeItem: 'home'
    };

    constructor(props: any) {
        super(props)
        const token = sessionStorage.getItem('token')
        const user = sessionStorage.getItem('user')
        if(token && user) {
            this.state = {
                isAuthenticated: true,
                token,
                user: JSON.parse(user),
            }
        } else {
            this.state = {
                isAuthenticated: false,
                token: undefined,
                user: undefined,
            }
        }
    }

    authenticate = (login: string, password: string, cb: (error: ?Error) => void) => {
        api.login(login, password)
            .then(({token, owner}) => {
                this.setState({isAuthenticated: true, token, user: owner})
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('user', JSON.stringify(owner))
                cb(null)
            })
            .catch(error => cb(error))
    }

    signout = (callback: () => void) => {
        this.setState({isAuthenticated: false, token: undefined, user: undefined})
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        callback()
    };


    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }

    render() {
        const { isAuthenticated, user, token, activeItem } = this.state


        const MenuBar = withRouter(({ history, location: { pathname } }) => {
            if(isAuthenticated && user) {
                return (
                    <Menu inverted>
                      <Menu.Item
                          name='home'
                          active={activeItem === 'home'}
                          content='Home'
                          onClick={(event) => {
                    event.preventDefault()
                    this.handleItemClick
                    history.push('/')
                  }}
                      />

                      <Menu.Item
                          name='kontoübersicht'
                          active={activeItem === 'kontoübersicht'}
                          content='Kontoübersicht'
                          onClick={(event) => {
                    event.preventDefault()
                    this.handleItemClick
                    history.push('/dashboard')
                  }}
                      />

                      <Menu.Item
                          name='zahlungen'
                          active={activeItem === 'zahlungen'}
                          content='Zahlungen'
                          onClick={(event) => {
                    event.preventDefault()
                    this.handleItemClick
                    history.push('/transactions')
                  }}
                      />
                      <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                            content={user.firstname +' '+ user.lastname+', Logout'}
                            onClick={(event) => {
              event.preventDefault()
              this.signout(() => history.push('/'))
            }}
                        />
                      </Menu.Menu>

                    </Menu>

                )
            } else {
                return (
                    <Menu inverted>
                  <Menu.Item
                      name='Anmelden'
                      onClick={()=>{history.push('/login')}}
                  />
                  <Menu.Item
                      name='Registrieren'
                      onClick={()=>{history.push('/signup')}}
                  />
                </Menu>);
            }
        })

        return (
            <Router>
              <div>
                <MenuBar/>
                <Route exact path="/" render={props => <Home {...props} isAuthenticated={isAuthenticated}/>}/>
                <Route path="/login" render={props => <Login {...props} authenticate={this.authenticate} />}/>
                <Route path="/signup" component={Signup}/>
                  {/*
                   The following are protected routes that are only available for logged-in users. We also pass the user and token so
                   these components can do API calls. PrivateRoute is not part of react-router but our own implementation.
                   */}
                <PrivateRoute path="/dashboard" isAuthenticated={isAuthenticated} token={token} user={user} component={Dashboard}/>
                <PrivateRoute path="/transactions" isAuthenticated={isAuthenticated} token={token} user={user} component={AllTransactions}/>
              </div>
            </Router>
        )
    }
}

export default App
