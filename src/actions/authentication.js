import axios from 'axios'
import { SET_CURRENT_USER } from './types'
import jwt_decode from 'jwt-decode'

const API_URL = 'http://localhost:3001/api/users/'

export const setAuthToken = token => token
  ? (axios.defaults.headers.common['Authorization'] = token)
  : delete axios.defaults.headers.common['Authorization']

export const registerUser = (user, history) => {
  axios.post(API_URL + 'register', user)
    .then(res => history.push('/'))
    .catch(err => console.log(err))
}

export const loginUser = user => dispatch => {
  axios.post(API_URL, user)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => console.log(err))
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = history => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
  history.push('/')
}
