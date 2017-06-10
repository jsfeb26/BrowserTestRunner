import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Runner from '../containers/runner';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Cool Test Runner</h2>
        </div>
        <p className="App-intro">
          To get started, click start tests.
        </p>
        <Runner />
      </div>
    );
  }
}

export default App;
