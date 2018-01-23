import React, { Component } from 'react'
import Routes from './routes'
// import Loading from './components/Loading'
// import LoadErrors from './components/LoadErrors'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Classes</h1>
        </header>
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
