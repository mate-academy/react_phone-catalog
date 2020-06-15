import React from 'react';

import './App.scss';
import Header from './components/Header/Header';
import HomePage from './components/homePage/HomePage';
import Footer from './components/Footer/Footer';

const App = () => (
  <div className="App">
    <Header />
    <HomePage />
    <Footer />
  </div>
);

export default App;
