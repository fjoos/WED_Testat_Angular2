// @flow

import React from 'react'
import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'
import { Dropdown } from 'semantic-ui-react'
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
        betrag: 0

    };

  render() {
    const kontoDescription = this.props.user.accountNr+'('+this.state.kontostand+')';
    return (
        <div>
            <header>Kontoübersicht {this.props.user.accountNr}</header>
            <form>
                <header>Neue Zahlung</header>
                <label>Von</label>
                <Dropdown text={kontoDescription}
                          value={this.props.user.accountNr}
                          options={[{key:'1', value:this.state.meinKonto, text:kontoDescription}]}
                          type="text"/>
                <label>Nach</label>
                <input value={this.state.zielKonto} type="text" onChange={this.handleTransactionTargetChange} placeholder="Zielkontonummer"/>
                <label>Betrag</label>
                <input value={this.state.betrag} type="number" onChange={this.handleAmountChange}/>
            </form>
            <button>Betrag Überweisen</button>
        </div>


    )
  }

    handleTransactionTargetChange = (event) => {
      this.setState({zielKonto: event.target.value})
    }

    handleAmountChange = (event) => {
      this.setState({betrag: event.target.value})
    }
    componentDidMount() {
        getAccountDetails(this.props.token)
            .then(({amount}) =>
                this.setState({kontostand: amount})
            )
    }



}

export default Dashboard
