import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import { setAuthToken, setCurrentUser, logoutUser } from './actions/authentication'
import PrivateRoute from './components/PrivateRoute'
import Nav from './components/Nav'
import Register from './components/Register'
import PublicPosts from './components/PublicPosts'
import Dashboard from './components/Dashboard'
import './index.css'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/'
  }
}

const App = () => <Provider store={store}>
  <Router>
    <Nav />
    <main className="flex-shrink-0">
      <div className="container">
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <Route exact path="/" component={PublicPosts} />
      </div>
    </main>
    <footer className="footer mt-auto py-3">
      <div className="container" style={{ textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} Christina Voudouris. All rights reserved.
        {' '}<Register />
      </div>
    </footer>
  </Router>
</Provider>

render(<App />, document.getElementById('root'))
