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
        iterationEnd: 0,
        resultCount: 0,
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
      <div>
          <h1>Alle Transaktionen</h1>
        <Segment inverted>
          <Grid columns='equal' stackable>
            <Grid.Column>
            <Dropdown value={this.state.selectedYear} onChange={this.changeYear.bind(this)} placeholder='Jahr' fluid search selection options={this.yearOption} />
            </Grid.Column>
            <Grid.Column>
            <Dropdown value={this.state.selectedMonth} onChange={this.changeMonth.bind(this)} placeholder='Monat' fluid search selection options={this.monthOption} />
            </Grid.Column>
              <Grid.Column>
                 <Button onClick={this.resetProperties.bind(this)}>Zurücksetzen</Button>
              </Grid.Column>
          </Grid>
        </Segment>
          <Grid.Column>
              <header><h2>Letzte Transaktionen</h2></header>

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

            <CheckTransactions name={this.state.resultCount} />
          <Menu compact>
              <Menu.Item as={Button}  name='back' active={this.state.iteration >10} disabled={this.state.iteration<10} onClick={this.handlePageClick.bind(this)}>
                 Back to the future!
              </Menu.Item>
              <Menu.Item name='Transaktionen'>
                  Transaktionen {this.state.iteration+1} bis {this.state.iterationEnd} von {this.state.resultCount}
              </Menu.Item>
              <Menu.Item as={Button} name='for' active={this.state.iteration<this.state.resultCount} disabled={this.state.iteration+10>=this.state.resultCount} onClick={this.handlePageClick.bind(this)}>
                  Forward to the past!
              </Menu.Item>
          </Menu>
      </div>
    )
  }
    componentDidMount() {
       this.downloadNewData();
    }

    changeYear(event, data){
      this.setState({selectedYear:data.value});
      var startMonth;
      var endMonth;
    if(this.state.selectedMonth !== ''){
        startMonth = this.state.selectedMonth;
        endMonth = this.state.selectedMonth;
    }else{
        startMonth = '01';
        endMonth = '12';
    }
       this.changeProperties(data.value, startMonth, endMonth);
    }

    changeMonth(event, data){
        this.setState({selectedMonth:data.value});
        if(this.state.selectedYear !== ''){
           this.changeProperties(this.state.selectedYear, data.value, data.value);
        }
    }

    changeProperties(year, startMonth, endMonth){
        this.setState({
            fromDate: moment(new Date(year + "-" + startMonth + "-01" )).toISOString(),
            toDate: moment(new Date(year + "-" + endMonth + "-31" )).toISOString(),
            iteration: 0,
            iterationEnd:0
        },()=>{this.downloadNewData()});
    }

    resetProperties(event, data) {
        this.setState({
            fromDate: '',
            toDate: '',
            iteration: 0,
            iterationEnd: 0,
            resultCount: 0,
            selectedYear: '',
            selectedMonth: ''
        }, () => {
            this.downloadNewData()
        });
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
                this.setState({transactions,
                    resultCount: query.resultcount,
                    iterationEnd: this.state.iteration + transactions.length})
            );
    }
}
function Status(amount) {
    if (amount.name < 0) {
        return <p> - Lastschrift</p>;
    } else {
        return <p> - Gutschrift</p>;
    }
}

function CheckTransactions(amount){
    console.log(amount.name);
    if(amount.name <= 0){
        return <p>Keine Transaktionen</p>;
    }else{
        return <p></p>;
    }
}

export default AllTransactions
