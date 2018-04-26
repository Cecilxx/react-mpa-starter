import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import helloReducer from './hello'

const rootReducer = combineReducers({
  routing,
  helloReducer
})

export default rootReducer
