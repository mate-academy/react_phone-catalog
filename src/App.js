import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { getPhones } from './api/getPhones';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PhonesPage from './components/PhonesPage';
import PhoneDetails from './components/PhoneDetails';
import NotFoundPage from './components/NotFoundPage';

export default class App extends Component {
  state = {
    initialPhones: [],
    orderedPhones: [],
  }

  async componentDidMount() {
    const data = await getPhones();

    this.setState({ initialPhones: data });

    const storage = this.getFromLocalStorage();

    this.setState({ orderedPhones: storage });

    setTimeout(() => this.saveToLocalStorage(), 0);
  }

  getFromLocalStorage = () => {
    const storageData = localStorage.getItem('orderedPhones');
    const getCart = JSON.parse(storageData);

    return getCart || [];
  };

  saveToLocalStorage = () => {
    const data = this.state.orderedPhones;

    localStorage.setItem('orderedPhones', JSON.stringify(data));
  };

  handleAddToCart = (event) => {
    const { id } = event.target;
    const quantity = 1;
    const link = `/phones/${id}`;
    const matchedPhone = this.state.initialPhones
      .find(phone => phone.id === id);

    const phone = { ...matchedPhone, quantity, link };
    const checkId = phoneId => phoneId.id === id;

    if (!this.state.orderedPhones.some(checkId)) {
      this.setState(state => ({
        orderedPhones: [...state.orderedPhones, phone],
      }));
    }

    setTimeout(() => this.saveToLocalStorage(), 100);
  }

  handleIncreasQuantity = (event) => {
    const { id } = event.target;

    this.setState(state => ({
      orderedPhones: state.orderedPhones.map(phone => (
        phone.id === id
          ? { ...phone, quantity: phone.quantity + 1 }
          : phone)),
    }));

    setTimeout(() => this.saveToLocalStorage(), 0);
  }

  handleDecreasQuantity = (event) => {
    const { id } = event.target;

    const matchedPhone = this.state.orderedPhones
      .find(item => item.id === id);

    if (matchedPhone.quantity > 1) {
      this.setState(state => ({
        orderedPhones: state.orderedPhones.map(phone => (
          phone.id === id
            ? { ...phone, quantity: phone.quantity - 1 }
            : phone)),
      }));
    }

    setTimeout(() => this.saveToLocalStorage(), 0);
  }

  handleDeleteItem = (event) => {
    const { id } = event.target;

    this.setState(state => ({
      orderedPhones: state.orderedPhones.filter(phone => phone.id !== id),
    }));

    setTimeout(() => this.saveToLocalStorage(), 0);
  }

  render() {
    const quantity = this.state.orderedPhones.length;

    return (
      <div className="phones-catalog">
        <Header quantity={quantity} />
        <main className="content-container">
          <Switch>
            <Route path="/" exact component={HomePage} />

            <Route
              path="/phones"
              exact
              render={props => (
                <PhonesPage
                  initialPhones={this.state.initialPhones}
                  handleAddToCart={this.handleAddToCart}
                  location={props.location}
                  history={props.history}
                />
              )}
            />
            <Route
              path="/cart"
              exact
              render={() => (
                <Cart
                  orderedPhones={this.state.orderedPhones}
                  handleIncreasQuantity={this.handleIncreasQuantity}
                  handleDecreasQuantity={this.handleDecreasQuantity}
                  handleDeleteItem={this.handleDeleteItem}
                />
              )}
            />

            <Route
              path="/phones/:id"
              exact
              render={props => (
                <PhoneDetails
                  id={props.match.params.id}
                  handleAddToCart={this.handleAddToCart}
                />
              )}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

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
