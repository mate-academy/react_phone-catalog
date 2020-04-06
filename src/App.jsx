import React from 'react';

import './App.scss';
import { Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Phones } from './components/Phones/Phones';
import { Tablets } from './components/Tablets/Tablets';
import { Accessories } from './components/Accessories/Accessories';

const App = () => (
  <div className="app-wrapper">
    <Header />
    <MainContent />
  </div>
);

export default App;

const MainContent = () => {
  return (
    <div className="app-wrapper__content">
      <Route
        path="/"
        render={() => (<Home />)}
      />
      <Route
        path="/phones"
        render={() => (<Phones />)}
      />
      <Route
        path="/tablets"
        render={() => (<Tablets />)}
      />
      <Route
        path="/accessories"
        render={() => (<Accessories />)}
      />
    </div>
  );
};
