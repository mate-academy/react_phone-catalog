/* eslint-disable */
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import './fonts.css';
import './App.css';
import Home from './components/Home';
import NotFoundPage from './components/NotFoundPage';
import Basket from './components/Basket'
import FullCatalog from './components/FullCatalog';
import PhoneInfo from './components/PhoneInfo';

class App extends React.Component {
  state = {
    basket: [],
  };
  
  basketInject = (itemId, itemUrl, itemName, itemImage) => {
    const item = {
      id: itemId,
      quantity: 1,
      phone: itemUrl,
      name: itemName,
      image: itemImage,
    }
    this.setState(prevState => ({
      basket: !prevState.basket.find(basketItem => basketItem.id === item.id)
        ? [...prevState.basket, item]
        : prevState.basket
          .map(basketItem => basketItem.id === item.id
            ? { ...basketItem, quantity: basketItem.quantity +1 }
            : basketItem)
    }));
  };
  
  basketRemoveItem = (itemId) => {
    this.setState(prevState => ({
      basket: prevState.basket.filter(item => item.id !== itemId)
    }))
  };
  
  basketChangeItemQuantity =(id, direction) => {
    direction === 'plus'
      ? this.setState(prevState => ({
        basket: prevState.basket
          .map(basketItem => basketItem.id === id
            ? { ...basketItem, quantity: basketItem.quantity +1 }
            : basketItem)
      }))
      : this.setState(prevState => ({
        basket: prevState.basket
          .map(basketItem => basketItem.id === id
            ? { ...basketItem, quantity: basketItem.quantity -1 }
            : basketItem)
      }))
  };
  
  render() {
    const { basket } = this.state;
    return (
      <div className="App">
        <div className="main-link__container">
          <div className="logo">LOGO</div>
          <NavLink
            to="/"
            exact
            className="main-link"
            activeClassName="main-link__active"
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className="main-link"
            activeClassName="main-link__active"
          >
            Phone Catalog
          </NavLink>
          <NavLink
            to="/basket"
            className={this.state.basket.length !== 0
              ? 'main-link main-link__have-item'
              : 'main-link'}
            activeClassName="main-link__active"
          >
            <img
              className='main-link__basket'
              src="img/shopping-cart.svg"
            />
          </NavLink>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route  exact path='/catalog' render={({ match}) =>
            <FullCatalog
              match={match}
              basketInject={this.basketInject} />
            }
            />
          <Route
            path="/catalog/:phoneId?"
            render={({ match }) =>
              <PhoneInfo
                basketInject={this.basketInject}
                basket={basket}
                match={match}
              />}/>
          <Route
            path="/basket"
            render={() => (
              <Basket
                basketRemoveItem={this.basketRemoveItem}
                basket={basket}
                basketChangeItemQuantity={this.basketChangeItemQuantity}
              />)} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
