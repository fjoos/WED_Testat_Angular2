// @flow

import React from 'react'
import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'

/*
  Use the api functions to call the API server. For example, the transactions
  can be retrieved and stored in the state as follows:

 getTransactions(this.props.token)
 .then(({result: transactions}) =>
 this.setState({transactions})
 );
    
*/


export type Props = {
  token: string,
}

class Dashboard extends React.Component {
  
  props: Props
  
  render() {    

    return (
        <form>
          <div>
            <label>Kontoübersicht {this.props.user.accountNr}</label>
          </div>
        </form>

    )
  }
}

export default Dashboard
