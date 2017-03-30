// @flow

import React from 'react'
import { Button } from 'semantic-ui-react'
import type { User } from '../api'

export type Props = {
  token: string,
  user: User,
}

class AllTransactions extends React.Component {
  
  props: Props
  
  render() {    
    return (
      <div>All Transactions

        <Button>asdfaf</Button>

      </div>

    )
  }
}

export default AllTransactions
