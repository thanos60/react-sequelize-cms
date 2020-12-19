import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../actions/authentication'

function Register({ history }) {
  const [newUser, setNewUser] = useState({ username: '', password: '' })
  const { username, password } = newUser

  const onChange = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const onSubmit = () => {
    registerUser(newUser, history)
  }

  return <>
    <button
      type="button"
      className="btn btn-outline-secondary btn-sm"
      data-bs-toggle="modal"
      data-bs-target="#registermodal">
      Register
    </button>
    <div
      className="modal fade"
      id="registermodal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title"
              id="staticBackdropLabel">
              Register
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <input
                  className="form-control"
                  required="required"
                  placeholder="Username"
                  id="username"
                  name="username"
                  onChange={onChange}
                  value={username}
                />
              </div>
              <div className="mb-3">
                <input
                  required="required"
                  className="form-control"
                  placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  onChange={onChange}
                  value={password}
                />
              </div>
              <button
                type="submit"
                className="btn btn-secondary"
              >
                Register
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
