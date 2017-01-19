import {initialState} from './selectors'
// import { POST_LIST_SUCCESS, POST_CREATE_SUCCESS } from './actions'

export default(state = initialState, action) => {
  switch (action.type) {
    case 'FEED_LIST_REQUEST':
      return state;
    default:
      return state
  }
}
