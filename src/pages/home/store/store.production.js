import { createStore, applyMiddleware } from 'redux'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../modules'

const router = routerMiddleware(hashHistory)

const enhancer = applyMiddleware(router)

export default function configureStore (initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
