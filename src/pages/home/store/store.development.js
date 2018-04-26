import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createHashHistory'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../modules'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const logger = () => {
  return createLogger({
    level: 'info',
    collapsed: true
  })
}

const router = routerMiddleware(middleware)

const enhancer = applyMiddleware(router, logger())

export default function configureStore (initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../modules', () =>
      store.replaceReducer(require('../modules'))
    )
  }

  return store
}
