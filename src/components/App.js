import React, {PropTypes, Component} from 'react'
import {injectGlobal} from 'styled-components'
import stream from 'getstream'

injectGlobal `
  body {
    margin: 0;
  }
`

class App extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  componentWillMount() {
    // instantiate a new client (client side)
    console.log('Connecting to stream');
    this.client = stream.connect('cq6bugwj7rnb', null, '19956');
    this.connectToStream();
  }

  render() {
    const {children} = this.props
    return (
      <div>{children}</div>
    )
  }

  componentDidUpdate(oldProps) {
    console.log('Component updated');
  }

  connectToStream = () => {
    var ericFeed = this.client.feed('user', 'eric', 'WYgLfo2ip9aGPPKBZywg5U8fSDw');
    //ericFeed.addActivity({actor: 'eric', tweet: 'Hello world', verb: 'tweet', object: 1});
    ericFeed.get({limit: 5, offset: 5}).then(function(body) {
      console.log(body);
    }).catch(function(reason) {/* on failure, reason.error contains an explanation */
      console.log(reason);
    });
  }
}

export default App
