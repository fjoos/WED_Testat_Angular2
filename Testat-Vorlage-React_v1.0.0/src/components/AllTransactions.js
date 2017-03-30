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
import { Button, Grid, Segment} from 'semantic-ui-react'
import type { User } from '../api'
import moment from "moment";

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

        <Segment>
          <Grid columns='equal' stackable>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
              Von
            </Grid.Column>
            <Grid.Column>
              Nach
            </Grid.Column>
            <Grid.Column>
              Betrag
            </Grid.Column>
            <Grid.Column>
              Saldo
            </Grid.Column>
          </Grid>

          {this.state.transactions.map(({from, target, amount, total, date})=>

                <Grid columns='equal' stackable>
                  <Grid.Column>
                      {date}-
                  </Grid.Column>
                  <Grid.Column>
                      {from}
                  </Grid.Column>
                  <Grid.Column>
                      {target}
                  </Grid.Column>
                  <Grid.Column>
                      {amount}
                  </Grid.Column>
                  <Grid.Column>
                      {total}
                  </Grid.Column>
                </Grid>

          )}
        </Segment>
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
