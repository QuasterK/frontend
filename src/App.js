import React, { Component } from 'react';
import './App.css';
import Authors from './components/Authors';
import Stats from './components/Stats';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Authors/>
        <Stats/>
      </div>
    );
  }
}

export default App;
