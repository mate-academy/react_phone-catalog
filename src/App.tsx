import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { BigCarousel } from './components/BigCarousel';

const App = () => (
  <div className="App">
    <HashRouter>
      <Header />
    </HashRouter>
    <BigCarousel />
  </div>
);

export default App;
