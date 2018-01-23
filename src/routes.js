import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ClassesContainer from './containers/ClassesContainer'
import ClassPage from './classes/ClassPage'
import StudentPage from './students/StudentPage'
// import SignUp from './users/SignUp'
// import SignIn from './users/SignIn'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ClassesContainer} />
        <Route path="/classes/:batchNumber/students/:id" component={StudentPage} />

        <Route exact path="/classes/:batchNumber" component={ClassPage} />
        {/* <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} /> */}
      </div>
    )
  }
}