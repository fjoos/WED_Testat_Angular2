// @flow
import {getTransactions } from '../api'

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
import {Button, Dropdown, Grid, Menu, Segment, Table} from 'semantic-ui-react'
import type { User } from '../api'
import moment from "moment";

export type Props = {
  token: string,
  user: User,
}
class AllTransactions extends React.Component {


    props: Props;

    state ={
      transactions: [],
        fromDate: '',
        toDate: '',
        iteration: 0,
        max: 100,
        selectedMonth: '',
        selectedYear: ''
    };

    yearOption = [ { key: '2015', value:'2015', text: '2015' },
        { key: '2016', value:'2016', text: '2016' },
        { key: '2017', value:'2017', text: '2017' }
    ];

    monthOption = [ { key: 'Januar', value: '01', text: 'Januar' },
        { key: 'Februar', value: '02', text: 'Februar' },
        { key: 'März', value:'03', text: 'März' },
        { key: 'April', value:'04', text: 'April' },
        { key: 'Mai', value:'05', text: 'Mai' },
        { key: 'Juni', value:'06', text: 'Juni' },
        { key: 'Juli', value:'07', text: 'Juli' },
        { key: 'August', value: '08', text: 'August' },
        { key: 'September', value:"09", text: 'September' },
        { key: 'Oktober', value:'10', text: 'Oktober' },
        { key: 'November', value:'11', text: 'November' },
        { key: 'Dezember', value:'12', text: 'Dezember' }
    ];

  render() {

    return (
      <div>All Transactions
        <Segment>
          <Grid columns='equal' stackable>
            <Grid.Column>
            <Dropdown value={this.state.selectedYear} onChange={this.changeYear.bind(this)} placeholder='Select Year' fluid search selection options={this.yearOption} />
            </Grid.Column>
            <Grid.Column>
            <Dropdown value={this.state.selectedMonth} onChange={this.changeMonth.bind(this)} placeholder='Select nach Monat' fluid search selection options={this.monthOption} />
            </Grid.Column>
              <Grid.Column>
                 <Button onClick={this.resetProperties.bind(this)}>reset </Button>
              </Grid.Column>
          </Grid>
        </Segment>

          <Grid.Column>
              <header><h2>Letzte Transaktionen</h2></header>
              <Table singleLine>
                  <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell>Datum</Table.HeaderCell>
                          <Table.HeaderCell>Von</Table.HeaderCell>
                          <Table.HeaderCell>Nach</Table.HeaderCell>
                          <Table.HeaderCell>Batrag</Table.HeaderCell>
                          <Table.HeaderCell>Saldo</Table.HeaderCell>
                      </Table.Row>
                  </Table.Header>
                  {this.state.transactions.map(({from, target, amount, total, date})=>
                      <Table.Body>
                          <Table.Row>
                              <Table.Cell>{moment(date).format("LL")} <Status name={amount} /> </Table.Cell>
                              <Table.Cell>{from}</Table.Cell>
                              <Table.Cell>{target}</Table.Cell>
                              <Table.Cell>{amount + " CHF"}</Table.Cell>
                              <Table.Cell>{total + " CHF"}</Table.Cell>
                          </Table.Row>
                      </Table.Body>
                  )}
              </Table>
          </Grid.Column>


          <Menu compact>
              <Menu.Item as={Button}  name='back' active={this.state.iteration >10} disabled={this.state.iteration<10} onClick={this.handlePageClick.bind(this)}>
                 back
              </Menu.Item>

              <Menu.Item name='Transaktionen'>
                  Transaktionen von {this.state.iteration+1} bis {this.state.iteration+10} ({this.state.max})
              </Menu.Item>

              <Menu.Menu as={Button} position='right'>
                  <Menu.Item as={Button} name='for' active={this.state.iteration<this.state.max} disabled={this.state.iteration>this.state.max} onClick={this.handlePageClick.bind(this)}>
                      forwärts
                  </Menu.Item>
              </Menu.Menu>
          </Menu>
      </div>
    )
  }
    componentDidMount() {
       this.downloadNewData();
    }

    changeYear(event, data){
      this.setState({selectedYear:data.value});
//2017-05-11T02:00:00.000Z
    if(this.state.selectedMonth != ''){
        this.setState({
            fromDate: moment(new Date(data.value + "-" + this.state.selectedMonth + "-01" )).toISOString(),
            toDate: moment(new Date(data.value + "-" + this.state.selectedMonth + "-31" )).toISOString()
        },()=>{this.downloadNewData()});
    }else{
        this.setState({
            fromDate: moment(new Date(data.value + "-01-01" )).toISOString(),
            toDate: moment(new Date(data.value + "-12-31" )).toISOString()
        },()=>{this.downloadNewData()});
    }

    }

    changeMonth(event, data){
        this.setState({selectedMonth:data.value});
        if(this.state.selectedYear != ''){
            this.setState({
                fromDate: moment(new Date(this.state.selectedYear + "-" + data.value + "-01" )).toISOString(),
                toDate: moment(new Date(this.state.selectedYear + "-" + data.value + "-31" )).toISOString()
            },()=>{this.downloadNewData()});
        }
    }

    resetProperties(event, data) {
        this.setState({
            fromDate: '',
            toDate: '',
            iteration: 0,
            max: 0,
            selectedYear: '',
            selectedMonth: ''
        }, () => {
            this.downloadNewData()
        });
        console.log("reset");
    }

    handlePageClick(event ,{name}){
        if(name === 'for'){
            this.setState({ iteration: this.state.iteration+10}, ()=>{this.downloadNewData();});
        }else if(name === 'back'  && this.state.iteration > 9){
            this.setState({ iteration: this.state.iteration-10}, ()=>{this.downloadNewData();});
        }

    }

    downloadNewData(event ,data){
        getTransactions(this.props.token, this.state.fromDate, this.state.toDate, 10, this.state.iteration)
            .then(({result: transactions, query}) =>
                this.setState({transactions, max: query.resultcount})
            );
    }
}
function Status(amount){
    if(amount.name < 0){
        return <p> - Lastschrift</p>;
    }else{
        return <p> - Gutschrift</p>;
    }
}
export default AllTransactions
