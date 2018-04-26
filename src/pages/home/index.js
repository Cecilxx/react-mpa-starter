import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import configureStore from './store'

import routes from './routes'
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

console.log('进入Home页成功')

const store = configureStore()

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>{routes}</ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
