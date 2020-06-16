import React from 'react';

import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import PhonesPage from './components/PhonesPage/PhonesPage';
import TabletsPage from './components/TabletsPage/TabletsPage';
import AccessoriesPage from './components/AccessoriesPage/AccessoriesPage';

const App = () => (
  <div className="App">
    <Header />
    <main>
      <Switch>
        <Route path="/HomePage" exact component={HomePage} />
        <Route path="/PhonesPage" exact component={PhonesPage} />
        <Route path="/TabletsPage" exact component={TabletsPage} />
        <Route path="/AccessoriesPage" exact component={AccessoriesPage} />
        <Redirect from="/" to="/HomePage" />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;
