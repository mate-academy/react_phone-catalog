import React from 'react';
import './styles/App.css';

import { Route, NavLink, Switch } from 'react-router-dom';
import Home from './Home';
import NotFoundPage from './NotFoundPage';
import PhonesPage from './PhonesPage';
import PhoneDetailsPage from './PhoneDetailsPage';
import Basket from './Basket';

class App extends React.Component {
  state = {
    basketItems: [],
  }

  handlerAddToBasket = (phone) => {
    const { basketItems } = this.state;

    const uniqueItem = basketItems.some(item => item.id === phone.id);

    this.setState((state) => {
      if (uniqueItem) {
        return {
          basketItems: state.basketItems
            .map(item => (
              (item.id === phone.id)
                ? {
                  ...item,
                  amount: item.amount += 1,
                } : item
            )),
        };
      }

      const phoneToBasket = {
        ...phone,
        amount: 1,
      };

      return {
        basketItems: [...basketItems, phoneToBasket],
      };
    });
  };

  handlerChangeAmount = (phoneId, operator) => {
    this.setState((state) => {
      switch (operator) {
        case 'plus':
          return {
            basketItems: state.basketItems.map(item => (
              (item.id === phoneId)
                ? ({ ...item, amount: item.amount + 1 })
                : ({ ...item })
            )),
          };
        case 'minus':
          return {
            basketItems: state.basketItems.map(item => (
              (item.id === phoneId && item.amount > 1)
                ? ({ ...item, amount: item.amount - 1 })
                : ({ ...item })
            )),
          };
        default: return;
      }
    });

  };

  handlerRemovePhone = (phoneId) => {
    this.setState(state => ({
      basketItems: state.basketItems
        .filter(item => item.id !== phoneId),
    }));
  };

  render() {
    const { basketItems } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="container container--header">
            <nav>
              <ul className="App__nav">
                <li className="App__nav-link">
                  <NavLink
                    className="nav-link"
                    to="/"
                    activeClassName="nav-link__active"
                    exact
                  >
                    Home
                  </NavLink>
                </li>
                <li className="App__nav-link">
                  <NavLink
                    className="nav-link"
                    to="/phone-catalog"
                    activeClassName="nav-link__active"
                  >
                    Phone Catalog
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="App-header__basket">
              <NavLink
                className="nav-link--basket"
                to="/basket"
              >
                <img src="./img/basket-icon.png" alt="basket" />
                <div className={basketItems.length
                  ? 'basket-items'
                  : 'basket-items basket-items--hidden'}
                >
                  {basketItems.length}
                </div>
              </NavLink>
            </div>
          </div>
        </header>

        <main className="App-container container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/phone-catalog/"
              exact
              render={() => (
                <PhonesPage handlerAddToBasket={this.handlerAddToBasket} />
              )}
            />
            <Route
              path="/phone-catalog/:phoneId"
              render={({ match }) => (
                <PhoneDetailsPage
                  match={match}
                  handlerAddToBasket={this.handlerAddToBasket}
                />
              )}
            />
            <Route
              path="/basket"
              exact
              render={() => (
                <Basket
                  basketItems={basketItems}
                  handlerRemovePhone={this.handlerRemovePhone}
                  handlerChangeAmount={this.handlerChangeAmount}
                />
              )}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
