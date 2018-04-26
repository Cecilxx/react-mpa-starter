import { createAction, createReducer } from 'redux-act'

export const add = createAction('add')

const initialState = {
  num: 0
}

export default createReducer(
  {
    [add]: (state, data) => ({ ...state, num: state.num++ })
  },
  initialState
)
