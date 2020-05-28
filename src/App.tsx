import React from 'react';

import './styles/App.scss';

import { Switch, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './components/HomePage/HomePage';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
    </Switch>
    <Footer />
  </div>
);

export default App;
