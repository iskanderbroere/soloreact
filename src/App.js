import React, { Component } from 'react'
import Routes from './routes'
import Navigation from './components/Navigation'
// import Loading from './components/Loading'
// import LoadErrors from './components/LoadErrors'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navigation />
        <main>
          {/* <Loading /> */}
          <Routes />
          {/* <LoadErrors /> */}
        </main>
      </div>
    );
  }
}

export default App
