import React, {Component} from 'react'

import {PageTemplate, Header} from 'components'
import {FeedListContainer} from 'containers'

class HomePage extends Component {


  render() {
    return (
      <div>
        <PageTemplate header={< Header />}>
          <FeedListContainer elementClick={this.handleClick}/>
        </PageTemplate>
      </div>
    )
  }

  handleClick() {
    console.log('clicked on element ->');
  }
}

export default HomePage
