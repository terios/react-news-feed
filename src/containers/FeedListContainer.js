import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {FeedList} from 'components'
import {fromFeeds} from 'store/selectors'

class FeedListContainer extends Component {
  static propTypes = {
    tilesData: PropTypes.array.isRequired
  };
  static defaultProps = {
    limit: 20
  };


  render() {
    const {tilesData, elementClick} = this.props;
    return <FeedList {...{tilesData, elementClick}}/>
  }
}

const mapStateToProps = (state) => ({tilesData: fromFeeds.getFeeds(state)});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FeedListContainer)
