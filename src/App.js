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
  
  basketInject = (item) => {
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
  
  render() {
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
            className="main-link"
            activeClassName="main-link__active"
          >
            <img
              className="main-link__basket"
              src="img/shopping-cart.svg"
            />
          </NavLink>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route  exact path='/catalog' component={FullCatalog}/>
          <Route
            path="/catalog/:phoneId?"
            render={({ match }) =>
              <PhoneInfo
                basketInject={this.basketInject}
                match={match}
              />}/>
          <Route
            path="/basket"
            render={() => (
              <Basket
                basketRemoveItem={this.basketRemoveItem}
                basket={this.state.basket}
              />)} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
