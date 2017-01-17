/**
 * Created by terios on 1/6/17.
 */

function drawer(state = [], action) {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return !state;
    case 'CLOSE_DRAWER':
      return false;
    default:
      return state;

  }
}

export default drawer;
