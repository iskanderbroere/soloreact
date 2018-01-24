import React, { Component } from 'react'
import Routes from './routes'
import { Link } from 'react-router-dom'
// import Loading from './components/Loading'
// import LoadErrors from './components/LoadErrors'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div className="container is-fluid">
          <div class="navbar-brand">
            <Link className="navbar-item" to="/classes">
              <h1>Welcome to Classes</h1>
            </Link>
          </div>
          <div class="navbar-end">
            <div style={{ paddingRight: 0 }} class="navbar-item">
              <p class="control">
                <Link class="button is-primary" to="/sign-in">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </nav>
        <main>
          {/* <Loading /> */}
          <Routes />
          {/* <LoadErrors /> */}
        </main>
      </div>
    );
  }
}

export default App;
