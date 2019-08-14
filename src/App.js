import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Phones from './components/Phones';
import NotFoundPage from './components/NotFoundPage';
import PhoneDetailsPage from './components/PhoneDetailsPage';
import Basket from './components/Basket';

class App extends React.Component {
  state = {
    basketItems: [],
  }

  addToBasket = (newItemPhone) => {
    const { basketItems } = this.state;
    const isUniqueItem = basketItems.some(basketItem => basketItem.id === newItemPhone.id);
    if (isUniqueItem) {
      this.setState({
        basketItems: basketItems.map(basketItem => {
          if (basketItem.id === newItemPhone.id) {
            basketItem.quantity += 1;
          }
        })
      })
    } else (
      this.setState({
        basketItems: [...basketItems, newItemPhone],
      })
    )
  }

  changeQuantityMinus = (phoneId) => {
    this.setState(prevState => ({
      basketItems: prevState.basketItems.map(basketItem =>
        (basketItem.id === phoneId) && (basketItem.quantity > 1)
          ? ({ ...basketItem, quantity: basketItem.quantity - 1 })
          : ({ ...basketItem })
      )
    }))
  }

  changeQuantityPlus = (phoneId) => {
    this.setState(prevState => ({
      basketItems: prevState.basketItems.map(basketItem =>
        (basketItem.id === phoneId) && (basketItem.quantity < 100)
          ? ({ ...basketItem, quantity: basketItem.quantity + 1 })
          : ({ ...basketItem })
      )
    }))
  }

  removeBasketItems = (phoneId) => {
    this.setState(prevState => ({
      basketItems: prevState.basketItems.filter(basketItem =>
        basketItem.id !== phoneId
      )
    }))
  }

  render() {
    const { basketItems } = this.state;

    return (
      <HashRouter>
        <div className="App">
          <Header basketItems={basketItems} />
        </div>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/phones/"
            exact
            render={props =>
              <Phones addToBasket={this.addToBasket} />}
          />
          <Route
            path="/phones/:phoneId"
            exact
            render={props =>
              <PhoneDetailsPage
                phoneId={props.match.params.phoneId}
                addToBasket={this.addToBasket}
              />
            }
          />
          <Route
            path="/basket/"
            exact
            render={props =>
              <Basket
                basketItems={basketItems}
                phoneId={props.match.params.phoneId}
                changeQuantityPlus={this.changeQuantityPlus}
                removeBasketItems={this.removeBasketItems}
                changeQuantityMinus={this.changeQuantityMinus}
              />
            }
          />

          <Route component={NotFoundPage} />
        </Switch>
      </HashRouter>
    )
  }
}

export default App;
