import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/PhonesPage';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/phones">
          <PhonesPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
