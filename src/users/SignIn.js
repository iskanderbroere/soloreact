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
      <div className="sign-in form">
        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <input autoFocus ref="email" type="email" placeholder="Email address" />
          </div>
          <div className="input">
            <input ref="password" type="password" placeholder="Password" />
          </div>
          <input type="submit" value="Sign in" />
        </form>
      </div>
    )
  }
}

export default connect(null, { signIn })(SignIn)