import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PhonesPage from './components/PhonesPage';
import PhoneDetails from './components/PhoneDetails';
import NotFoundPage from './components/NotFoundPage';

const App = () => (
  <div className="phones-catalog">
    <Header />

    {/* <h1>Phones catalog</h1> */}

    <main className="content-container">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/phones" exact component={PhonesPage} />
        <Route path="/cart/:id?" exact component={Cart} />

        <Route
          path="/phones/:id"
          exact
          render={props => <PhoneDetails id={props.match.params.id} />}
        />
        <Route component={NotFoundPage} />
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
  }),
};

App.defaultProps = {
  match: {
    params: {

      id: '',
    },
  },
};

export default App;
