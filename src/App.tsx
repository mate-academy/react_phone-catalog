import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import store from './store';

import './App.scss';
import './styles/_reset.scss';
import './styles/_fonts.scss';
import './styles/_vars.scss';

const App = () => {

  return (
    <Provider store={store}>

      <HashRouter>
        <Header />

        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </HashRouter>

    </Provider>
  );
}

export default App;
