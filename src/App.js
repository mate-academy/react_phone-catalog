import React from 'react';
import './App.css';
import {
  HashRouter,
  Route,
  NavLink,
  Link,
  Switch,
} from 'react-router-dom';

import HomePage from './components/HomePage';
import PhonesPage from './components/PhonesPage';
import NotFoundPage from './components/NotFoundPage';
import PhoneDetailsPage from './components/PhoneDetailsPage';
import Basket from './components/Basket';

class App extends React.Component {
  state = {
    basketItems: [],
  }

  handleAddToBasket = (currentPhone) => {
    this.setState((prevState) => {
      const phonesInBasket = prevState.basketItems
        .find(phone => phone.id === currentPhone.id)
        ? (
          prevState.basketItems.map(phone => (
            phone.id === currentPhone.id
              ? {
                ...phone,
                quantity: phone.quantity + 1,
              }
              : phone
          ))
        ) : (
          [...prevState.basketItems, {
            id: currentPhone.id,
            quantity: 1,
            img: currentPhone.imageUrl,
          }]
        );

      return ({
        ...prevState,
        basketItems: phonesInBasket,
       });
    });
  };

  handleRemovePhone = (phoneId) => {
    this.setState(prevState => ({
      basketItems: prevState.basketItems.filter(phone => phone.id !== phoneId),
    }));
  };

  handleIncQuantity = (phoneId) => {
    this.setState(prevState => ({
      basketItems: prevState.basketItems.map(phone => (
        phone.id !== phoneId
          ? phone
          : {
            ...phone,
            quantity: phone.quantity + 1,
          }
      )),
    }));
  };

  handleDecQuantity = (phoneId) => {
    this.setState((prevState) => {
      const phonesInBasket = prevState.basketItems.map(phone => (
        phone.id !== phoneId
          ? phone
          : {
            ...phone,
            quantity: phone.quantity - 1,
          }
      ));

      return {
        basketItems: phonesInBasket.filter(phone => phone.quantity > 0),
      };
    });
  };

  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="header">

            <div className="header__logo">
              <Link to="/">
                <img src="./img/logo.png" alt="Phone Catalog" />
              </Link>
            </div>

            <nav role="navigation">
              <ul className="main-menu">

                <li>
                  <NavLink
                    className="navlink"
                    to="/"
                    exact
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className="navlink"
                    to="/phones/"
                  >
                    Phones
                  </NavLink>
                </li>

                <li>
                  <Link to="/basket/">
                    <img
                      className="basket"
                      src="./img/basket.png"
                      alt="Basket"
                    />
                  </Link>
                </li>

              </ul>
            </nav>
          </header>

          <Switch>

            <Route
              path="/"
              exact
              component={HomePage}
            />

            <Route
              path="/phones/"
              exact
              render={() => (
                <PhonesPage handleAddToBasket={this.handleAddToBasket} />
              )}
            />

            <Route
              path="/phones/:phoneId"
              exact
              render={props => (
                <PhoneDetailsPage
                  phoneId={props.match.params.phoneId}
                  handleAddToBasket={this.handleAddToBasket}
                />
              )}
            />

            <Route
              path="/basket/"
              exact
              component={() => (
                <Basket
                  basketItems={this.state.basketItems}
                  handleRemovePhone={this.handleRemovePhone}
                  handleIncQuantity={this.handleIncQuantity}
                  handleDecQuantity={this.handleDecQuantity}
                />
              )}
            />

            <Route
              path="*"
              exact
              component={NotFoundPage}
            />

          </Switch>

        </div>

      </HashRouter>
    );
  }
}

export default App;
