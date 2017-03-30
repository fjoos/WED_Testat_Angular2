// @flow

import React from 'react'
import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'
import { Dropdown, Grid, Segment } from 'semantic-ui-react'

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
  props: Props;
    state = {
        kontostand: undefined,
        zielKonto: undefined,
        betrag: 0,
        transactions: []


    };

  render() {
    const kontoDescription = this.props.user.accountNr+'(CHF: '+this.state.kontostand+'.-)';
    return (
        <div>
            <header>Kontoübersicht {this.props.user.accountNr}</header>
            <form>
                <header>Neue Zahlung</header>
                <div>
                    <label>Von</label>
                    <Dropdown text={kontoDescription}
                              value={this.props.user.accountNr}
                              options={[{key:'1', value:this.state.meinKonto, text:kontoDescription}]}
                              type="text"/>
                </div>
                <div>
                    <label>Nach</label>
                    <input value={this.state.zielKonto}
                           type="text"
                           onChange={this.handleTransactionTargetChange}
                           placeholder="Zielkontonummer"/>
                </div>
                <div>
                    <label>Betrag</label>
                    <input value={this.state.betrag}
                           type="number"
                           onChange={this.handleAmountChange}/>
                </div>
                <div>
                    <button type="submit">Betrag Überweisen</button>
                </div>
            </form>

            <Segment>
                <header>Letzte Zahlungen</header>
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

    handleTransactionTargetChange = (event) => {
      this.setState({zielKonto: event.target.value})
    };

    handleAmountChange = (event) => {
      this.setState({betrag: event.target.value})
    };
    componentDidMount() {
        getAccountDetails(this.props.token)
            .then(({amount}) =>
                this.setState({kontostand: amount})
            );
            getTransactions(this.props.token)
                .then(({result: transactions}) =>
                    this.setState({transactions})
                )

    }



}

export default Dashboard
