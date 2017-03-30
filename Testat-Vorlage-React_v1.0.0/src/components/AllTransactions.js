// @flow
import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'

/*
 Use the api functions to call the API server. For example, the transactions
 can be retrieved and stored in the state as follows:

 getTransactions(this.props.token)
 .then(({result: transactions}) =>
 this.setState({transactions})
 )

 import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'
 */


import React from 'react'
import { Button } from 'semantic-ui-react'
import type { User } from '../api'

export type Props = {
  token: string,
  user: User,
}

class AllTransactions extends React.Component {
  
  props: Props;

    state ={
      transactions: []
    }

  render() {    
    return (
      <div>All Transactions

        <Button>asdfaf</Button>
          {this.state.transactions.map(({amount})=>
          <h1>{amount}</h1>
          )}
      </div>
    )
  }
    componentDidMount() {
        getTransactions(this.props.token)
            .then(({result: transactions}) =>
                this.setState({transactions})
            )
    }
}

export default AllTransactions
