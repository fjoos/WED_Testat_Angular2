// @flow

import React from 'react'
import { getAccountDetails, transfer, getTransactions } from '../api'
import { Grid, Segment, Table, Button, Form } from 'semantic-ui-react'
import moment from "moment"
import { Link } from 'react-router-dom'



/*
  Use the api functions to call the API server. For example, the transactions
  can be retrieved and stored in the state as follows:

 getTransactions(this.props.token)
 .then(({result: transactions}) =>
 this.setState({transactions})
 );
 {/* Links inside the App are created using the react-router's Link component *///}

//*/

export type Props = {
  token: string,
}

class Dashboard extends React.Component {
  props: Props;
    state = {
        kontostand: undefined,
        zielKonto: 0,
        betrag: 0,
        transactions: []


    };
  render() {
      const kontoDescription = this.props.user.accountNr+'(CHF: '+this.state.kontostand+'.-)';



    return (

        <div>
            <Grid divided='vertically'>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <header><h1>Kontoübersicht {this.props.user.accountNr}</h1></header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <header><h2>Neue Zahlung</h2></header>
                        <Segment inverted>
                            <Form onSubmit={this.handleTransactionFromTo} inverted>
                                <Form.Group widths='equal'>
                                    <Form.Dropdown label='Von'
                                                   text={kontoDescription}
                                                   value={this.props.user.accountNr}
                                                   options={[{key:'1', value:this.props.user.accountNr, text:kontoDescription}]}
                                                   type="text"/>
                                    <Form.Input label='Nach'
                                                value={this.state.zielKonto}
                                                type="text"
                                                onChange={this.handleTransactionTargetChange}
                                                placeholder="Zielkontonummer"/>
                                    <Form.Input label='Betrag'
                                                value={this.state.betrag}
                                                type="number"
                                                onChange={this.handleAmountChange}/>
                                </Form.Group>
                                <Button inverted type='submit'>Bestätigen</Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <header><h2>Letzte Transaktionen</h2></header>
                        <Segment inverted>
                        <Table singleLine inverted>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Datum</Table.HeaderCell>
                                    <Table.HeaderCell>Von</Table.HeaderCell>
                                    <Table.HeaderCell>Nach</Table.HeaderCell>
                                    <Table.HeaderCell>Batrag</Table.HeaderCell>
                                    <Table.HeaderCell>Saldo</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {this.state.transactions.map(({from, target, amount, total, date}, index)=>
                                <Table.Body key={index}>
                                    <Table.Row>
                                        <Table.Cell>{moment(date).format("LL")}</Table.Cell>
                                        <Table.Cell>{from}</Table.Cell>
                                        <Table.Cell>{target}</Table.Cell>
                                        <Table.Cell>{amount + " CHF"}</Table.Cell>
                                        <Table.Cell>{total + " CHF"}</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            )}
                        </Table>
                        <Link to="/transactions"><Button inverted>Alle Transaktionen</Button></Link>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>

          );

  }

    handleTransactionFromTo = (event) => {
      event.preventDefault();
      transfer(this.state.zielKonto, this.state.betrag, this.props.token)
          .then(result => {
              console.log(result);
              getTransactions(this.props.token)
                      .then(({result: transactions}) =>
                          this.setState({transactions})
                      );
              getAccountDetails(this.props.token)
                  .then(({amount}) =>
                      this.setState({kontostand: amount})
                  );
          }).catch(console.log("There was an Error!"))
        this.setState({zielKonto: 0});
        this.setState({betrag: 0});
    };

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
