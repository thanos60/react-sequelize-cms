import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import authReducer from './reducers'

const initialState = {}
const middleware = [thunk]

const store = createStore(
  authReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
