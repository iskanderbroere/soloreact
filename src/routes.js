import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ClassesContainer from './containers/ClassesContainer'
// import RecipePage from './recipes/RecipePage'
// import SignUp from './users/SignUp'
// import SignIn from './users/SignIn'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={ClassesContainer} />
        {/* <Route path="/recipes/:recipeId" component={RecipePage} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} /> */}
      </div>
    )
  }
}