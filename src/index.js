import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { useScroll } from 'react-router-scroll'
import configureStore from 'store/configure'

// react-tap-event-plugin to listen for touch / tap / clickevents.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import routes from 'routes'


const defaultState = {
  drawer: false
};

const store = configureStore(defaultState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)
const root = document.getElementById('app')


const renderApp = () => (
  <AppContainer>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Provider store={store}>
        <Router history={history} routes={routes} render={applyRouterMiddleware(useScroll())}/>
      </Provider>
    </MuiThemeProvider>
  </AppContainer>
)

render(renderApp(), root)

if (module.hot) {
  module.hot.accept('routes', () => {
    require('routes')
    render(renderApp(), root)
  })
}
