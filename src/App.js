import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import HomePage from './components/HomePage';
import PhonesPage from './components/PhonesPage';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';
import PhoneDetails from './components/PhoneDetails';
import Cart from './components/Cart';

const App = () => (
  <div className="phones-catalog">
    <Header />

    {/* <h1>Phones catalog</h1> */}

    <main className="content-container">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/phones" exact component={PhonesPage} />
        <Route path="/cart" exact component={Cart} />

        <Route
          path="/phones/:id"
          exact
          render={props => <PhoneDetails id={props.match.params.id} />}
        />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </main>

    <Footer />
  </div>
);

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default App;
