import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Main from './components/Main/Main';

const App = () => (
  <div className="App">
    <HashRouter>
      <Nav />
      <Main />
    </HashRouter>
  </div>
);

export default App;
