import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authentication'

function Login({ loginUser }) {
  const [user, setUser] = useState({ username: '', password: '' })

  const { username, password } = user

  const onChange = e => setUser({
    ...user,
    [e.target.name]: e.currentTarget.value
  })

  const onSubmit = async e => {
    e.preventDefault()
    loginUser(user)
  }

  return <form onSubmit={onSubmit} style={{ display: 'flex' }}>
    <input
      className="form-control"
      placeholder="Username"
      id="username"
      name="username"
      onChange={onChange}
      value={username}
      required="required"
      style={{ marginRight: '10px' }}
    />
    <input
      className="form-control"
      placeholder="Password"
      id="password"
      name="password"
      type="password"
      onChange={onChange}
      value={password}
      required="required"
      style={{ marginRight: '10px' }}
    />
    <button
      className="btn btn-secondary"
      type="submit"
    >
      Login
  </button>
  </form>
}

const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps, { loginUser })(withRouter(Login))
