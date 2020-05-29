import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { PhonesPage } from './pages/PhonesPage';
import { HomePage } from './pages/HomePage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { Footer } from './components/Footer/Footer';
import { FavoritesPage } from './pages/FavoritesPage';
import { CardPage } from './pages/CardPage';
import './App.scss';

const App = () => (
  <>

    <Header />

    <main>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/phones/:peopleId?" component={PhonesPage} />
        <Route path="/tablets" component={TabletsPage} />
        <Route path="/accessories" component={AccessoriesPage} />
        <Route path="/favorites" exact component={FavoritesPage} />
        <Route path="/card" exact component={CardPage} />

        <Redirect from="/home" to="/" />
        <h1>Page not found</h1>
      </Switch>
    </main>

    <Footer />

  </>
);

export default App;
