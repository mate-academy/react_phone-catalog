import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { getPhones } from './api/getPhones';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PhonesPage from './components/PhonesPage';
import SearchPanel from './components/SearchPanel';
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

    this.saveToLocalStorage();
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

  handleAddToCart =(event) => {
    const { id } = event.target;
    const quantity = 1;
    const link = `/phones/${id}`;
    const matchedPhone = this.state.initialPhones
      .filter(phone => phone.id === id)[0];

    const phone = { ...matchedPhone, quantity, link };
    const checkId = phoneId => phoneId.id === id;

    if (!this.state.orderedPhones.some(checkId)) {
      this.setState(state => ({
        orderedPhones: [...state.orderedPhones, phone],
      }));
    }

    this.saveToLocalStorage();
  }

  handleIncreasQuantity = (event) => {
    const { id } = event.target;

    const phone = this.state.orderedPhones
      .filter(item => item.id === id)[0];

    phone.quantity += 1;

    this.setState(state => ({ orderedPhones: state.orderedPhones }));

    this.saveToLocalStorage();
  }

  handleDecreasQuantity = (event) => {
    const { id } = event.target;

    const phone = this.state.orderedPhones
      .filter(item => item.id === id)[0];

    if (phone.quantity > 1) {
      phone.quantity -= 1;
    }

    this.setState(state => ({ orderedPhones: state.orderedPhones }));

    this.saveToLocalStorage();
  }

  handleDeleteItem = (event) => {
    const { id } = event.target;

    const phoneIndex = this.state.orderedPhones.findIndex(
      phone => phone.id === id
    );

    this.state.orderedPhones.splice(phoneIndex, 1);
    this.setState(state => ({
      orderedPhones: state.orderedPhones,
    }));

    this.saveToLocalStorage();
  }

  render() {
    setTimeout(() => {
      this.saveToLocalStorage();
    }, 200);

    return (
      <div className="phones-catalog">
        <Header orderedPhonesLength={this.state.orderedPhones.length} />
        <main className="content-container">
          <Switch>
            <Route path="/" exact component={HomePage} />

            <Route
              path="/phones"
              exact
              render={() => (
                <PhonesPage
                  handleAddToCart={this.handleAddToCart}
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
              exact
              path="/phones/?query=&sort="
              component={SearchPanel}
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
