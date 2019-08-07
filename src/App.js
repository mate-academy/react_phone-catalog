import React from 'react';
import './App.css';
import './sass/loading.css';
import { HashRouter } from 'react-router-dom';

import Header from './components/Header';

const App = () => (
  <HashRouter>
    <div className="App">
      <Header />
    </div>
  </HashRouter>
)

export default App;
