import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authentication'

import { Link, withRouter } from 'react-router-dom'
import Login from './Login'

function Nav({ auth: { isAuthenticated }, history, logoutUser }) {
  const onLogout = e => {
    e.preventDefault()
    logoutUser(history)
  }

  const authLinks = <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className="nav-item">
      <Link to='/dashboard' className="nav-link">Manage Posts</Link>
    </li>
    <li className="nav-item">
      <Link to='/logout' className="nav-link" onClick={onLogout}>Logout</Link>
    </li>
  </ul>

  return <><nav className="navbar navbar-expand-md navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">CMS</a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" color="white"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        {isAuthenticated ? authLinks : <ul className="valign-wrapper right">
          <li><Login /></li>
        </ul>}
      </div>
    </div>
  </nav>
    <img style={{ width: '100%' }} alt="" src="#" />
  </>
}

const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps, { logoutUser })(withRouter(Nav))
