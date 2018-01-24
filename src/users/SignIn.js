import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import signIn from '../actions/user/sign-in'

export class SignIn extends PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  submitForm(event) {
    event.preventDefault()
      const user = {
        email: this.refs.email.value,
        password: this.refs.password.value
      }
      this.props.signIn(user)
  }

  render() {
    return (
      <div className="container is-fluid">
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input"
                autoFocus ref="email"
                type="email"
                placeholder="jamie@gulliver.dev" />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" ref="password" type="password" />
            </div>
          </div>
          <div className="control">
            <input className="button is-link" type="submit" value="Sign in" />
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, { signIn })(SignIn)