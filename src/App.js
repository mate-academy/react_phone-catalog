import React from 'react';
import './styles/app.scss';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoaderPageOfPhones from './pages/LoaderPageOfPhones';
import Page404 from './pages/Page404';
import LoaderDetailsForOnePhone from './pages/LoaderDetailsForOnePhone';
import BasketPage from './pages/BasketPage';
import { BASE_URL } from './components/constants';

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
        default:
          console.log("Данный случай отстуствует среди данных условий");
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

    const responsePhones = await fetch(`${BASE_URL}/api/phones.json`);
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
      <>
        <Navbar
          itemsAtBasket={itemsAtBasket}
        />

        <main>
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
                <LoaderPageOfPhones
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
                <LoaderDetailsForOnePhone
                  loadDataPhones={this.loadDataPhones}
                  phones={phones}
                  id={match.params.id}
                />
              )}
            />
            <Route
              path="/basket/"
              render={() => (
                <BasketPage
                  itemsAtBasket={itemsAtBasket}
                  basketManager={this.basketManager}
                />
              )}
            />
            <Route 
              component={Page404} 
            />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
