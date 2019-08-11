import React from 'react';
import { Route, Switch } from 'react-router-dom';

import getDataJson from './getDataJson';
import Header from './Header';
import Home from './Home';
import Catalog from './Catalog';
import NotFoundPage from './NotFoundPage';
import PhonePage from './PhonePage';
import Cart from './Cart';
import Footer from './Footer';

import './slyles/App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      phonesList: [],
      searchStr: '',
      sortOrder: 0,
      styleType: 0,
      cart: [],
      inCart: [],
    };
  }

  loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const inCart = JSON.parse(localStorage.getItem('inCart'));

    cart && this.setState({ cart, inCart });
  }

  saveCart = () => {
    const cart = JSON.stringify(this.state.cart);
    const inCart = JSON.stringify(this.state.inCart);

    localStorage.setItem('cart', cart);
    localStorage.setItem('inCart', inCart);
  }

  componentDidMount = () => {
    this.loadCart();
  }

  componentWillUnmount = () => {
    this.saveCart();
  }

  getPhonesList = async() => {
    if (!this.state.phonesList[0]) {
      const phonesList = await getDataJson('https://mate-academy.github.io/phone-catalogue-static/api/phones.json');

      this.setState({
        phonesList,
      });
    }
  }

  handleSearch = (newSearch) => {
    this.setState({ searchStr: newSearch });
  }

  sortOrderChange = (newSortOrder) => {
    this.setState({ sortOrder: newSortOrder });
  }

  styleTypeChange = (newStyle) => {
    this.setState({ styleType: newStyle });
  }

  buyNowHandler = (phone) => {
    let existIndex = -1;
    const newCart = [...this.state.cart];

    for (let i = 0; i < this.state.cart.length; i++) {
      if (this.state.cart[i].phone.id === phone.id) {
        existIndex = i;
        break;
      }
    }

    if (existIndex >= 0) {
      newCart[existIndex].quantity += 1;
      this.setState(prevState => ({
        cart: [...newCart],
        inCart: [
          ...prevState.inCart,
          phone.id,
        ],
      }), this.saveCart());
    } else {
      const id = this.state.cart[0]
        ? this.state.cart[this.state.cart.length - 1].id + 1
        : 1;
      const quantity = 1;

      this.setState(prevState => ({
        cart: [
          ...prevState.cart,
          {
            id,
            quantity,
            phone: { ...phone },
          },
        ],
        inCart: [
          ...prevState.inCart,
          phone.id,
        ],
      }), this.saveCart());
    }
  }

  handlerCartQttySet = (index, value) => {
    const newValue = value >= 1 ? value : 1;
    const newCart = [...this.state.cart];

    if (this.state.cart[index].quantity < newValue) {
      this.setState(prevState => ({
        inCart: [
          ...prevState.inCart,
          this.state.cart[index].phone.id,
        ],
      }), this.saveCart());
    }

    if (this.state.cart[index].quantity > newValue) {
      const deleteIndex = this.state.inCart.findIndex(phoneId => phoneId === this.state.cart[index].phone.id);
      const newInCart = [...this.state.inCart];

      newInCart.splice(deleteIndex, 1);
      this.setState({
        inCart: [...newInCart],
      }, this.saveCart());
    }

    if (newCart[index].quantity !== newValue) {
      newCart[index].quantity = newValue;

      this.setState({
        cart: [...newCart],
      }, this.saveCart());
    }
  }

  handleCartDeleteItem = (index) => {
    const deleteId = this.state.cart[index].phone.id;
    const newInCart = this.state.inCart.filter(phoneId => (phoneId !== deleteId));
    const newCart = [...this.state.cart];

    newCart.splice(index, 1);

    this.setState({
      cart: [...newCart],
      inCart: [...newInCart],
    }, this.saveCart());
  }

  render() {
    return (
      <div className="App">
        <Header
          searchStr={this.state.searchStr}
          handleSearch={this.handleSearch}
          sortOrder={this.state.sortOrder}
          sortOrderChange={this.sortOrderChange}
          styleType={this.styleType}
          styleTypeChange={this.styleTypeChange}
          cart={this.state.cart}
        />

        <main>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Home
                  searchStr={this.state.searchStr}
                />
              )}
            />
            <Route
              path="/cart"
              exact
              render={() => (
                <Cart
                  searchStr={this.state.searchStr}
                  cart={this.state.cart}
                  handlerCartQttySet={this.handlerCartQttySet}
                  handleCartDeleteItem={this.handleCartDeleteItem}
                />
              )}
            />
            <Route
              path="/phones"
              exact
              render={match => (
                <Catalog
                  addr={match}
                  searchStr={this.state.searchStr}
                  sortOrder={this.state.sortOrder}
                  handleSearch={this.handleSearch}
                  phonesList={this.state.phonesList}
                  getPhonesList={this.getPhonesList}
                  buyNowHandler={this.buyNowHandler}
                  inCart={this.state.inCart}
                  styleType={this.state.styleType}
                />
              )}
            />
            <Route
              path="/phones/pag=:page?"
              exact
              render={match => (
                <Catalog
                  addr={match}
                  searchStr={this.state.searchStr}
                  handleSearch={this.handleSearch}
                  sortOrder={this.state.sortOrder}
                  phonesList={this.state.phonesList}
                  getPhonesList={this.getPhonesList}
                  buyNowHandler={this.buyNowHandler}
                  inCart={this.state.inCart}
                  styleType={this.state.styleType}
                />
              )}
            />
            <Route
              path="/phones/phone-:phone?"
              render={match => (
                <PhonePage
                  searchStr={this.state.searchStr}
                  addr={match}
                  phonesList={this.state.phonesList}
                  getPhonesList={this.getPhonesList}
                  buyNowHandler={this.buyNowHandler}
                  inCart={this.state.inCart}
                />
              )}
            />
            <Route
              path="*"
              render={() => (
                <NotFoundPage
                  searchStr={this.state.searchStr}
                />
              )}
            />
          </Switch>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
