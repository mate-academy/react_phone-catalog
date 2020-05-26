import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';

const App = () => (
  <div className="App">
    <HashRouter>
      <Header />
    </HashRouter>
  </div>
);

export default App;
