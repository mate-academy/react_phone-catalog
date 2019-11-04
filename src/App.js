import React from 'react';
import './styles/app.scss';
import {
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';
import HomePage from './components/HomePage';
import PhonesPage from './components/PhonesPage';
import NotFoundPage from './components/NotFoundPage';
import PhoneDetailsPage from './components/PhoneDetailsPage';
import Basket from './components/Basket';
import { GIT_HUB_H2ASH } from './components/constants';

/**
 * [] - в конце доделать основную информацию
 * [] - корзина
 *    [x] - логика
 *    [x] - реализовать саму страницу basket
 *    [] - починить css активной корзины
 * [] - поработать над стилями всей страницы
 */

class App extends React.Component {
  state = {
    phones: '',
    isLoading: false,
    isLoaded: false,
    itemsAtBasket: [],
  };

  basketManager = (id, operation) => {
    const currentIndex = this.state.itemsAtBasket
      .findIndex(element => element.id === id);

    this.setState((prevState) => {
      let changedArray = [...prevState.itemsAtBasket];

      switch (operation) {
        case 'increase':
          return changedArray[currentIndex].quantity += 1;
        case 'decrease':
          changedArray[currentIndex].quantity === 1
            ? changedArray = changedArray.filter(obj => obj.id !== id)
            : changedArray[currentIndex].quantity -= 1;
          break;
        case 'remove':
          changedArray = changedArray.filter(obj => obj.id !== id);
          break;
      }

      return {
        itemsAtBasket: changedArray,
      };
    });
  };

  addItemToBasket = (itemToAdd) => {
    const currentIndex = this.state.itemsAtBasket
      .findIndex(element => element.id === itemToAdd.id);

    if (currentIndex >= 0) {
      this.setState((prevState) => {
        const changedArray = [...prevState.itemsAtBasket];

        changedArray[currentIndex].quantity += 1;

        return {
          itemsAtBasket: changedArray,
        };
      });
    } else {
      const requiredItem = { ...itemToAdd };

      requiredItem.quantity = 1;

      this.setState(prevState => ({
        itemsAtBasket: [...prevState.itemsAtBasket, requiredItem],
      }));
    }
  };

  loadDataPhones = async() => {
    this.setState({
      isLoaded: false,
      isLoading: true,
    });

    const responsePhones = await
    fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json');
    const phones = await responsePhones.json();

    this.setState({
      phones,
      isLoading: false,
      isLoaded: true,
    });
  };

  render() {
    const {
      phones, isLoading, isLoaded, itemsAtBasket,
    } = this.state;

    return (
      <div>
        <nav className="header">
          <NavLink
            className="header_wrapper-logo"
            href="#"
            to="/"
          >
            <img
              className="header__logo"
              src={`${GIT_HUB_H2ASH}/react_phone-catalog/img/logo.svg`}

              alt="logo"/>
          </NavLink>
          
          <ul className="header__ul">
            <li className="header__li"><NavLink
            className="header__link link"
            href="#"
            exact
            to="/"
            >
            Home
            </NavLink></li>
  
            <li className="header__li"><NavLink
            className="header__link link"
            href="#"
            to="/phones/"
            >
            Phones
            </NavLink></li>
  
            <li className="header__li"><NavLink
            className="header__link link"
            href="#"
            to="/basket/"
            >
            Basket
            <span className="header__basket-quantity">
              { 
                itemsAtBasket.length
              }
            </span>
            </NavLink></li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/phones/"
            exact
            render={() => (
              <PhonesPage
                addItemToBasket={this.addItemToBasket}
                loadDataPhones={this.loadDataPhones}
                phones={phones}
                isLoading={isLoading}
                isLoaded={isLoaded}
              />
            )}
          />
          <Route
            path="/phones/:id?"
            render={({ match }) => (
              <PhoneDetailsPage
                loadDataPhones={this.loadDataPhones}
                phones={phones}
                id={match.params.id}
              />
            )}
          />
          <Route
            path="/basket/"
            render={() => (
              <Basket
                itemsAtBasket={itemsAtBasket}
                basketManager={this.basketManager}
              />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
