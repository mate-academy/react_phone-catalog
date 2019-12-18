import React from 'react';
import './styles/app.scss';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Index from './pages/index';
import LoaderOfPhones from './pages/phones/loaderOfPhones';
import Page404 from './pages/Page404/Page404';
import LoaderForPhone from './pages/phone/loaderForPhone';
import Basket from './pages/basket/basket';
import { BASE_URL } from './lib/constants';
import Footer from './components/Footer/Footer';
import Rights from './pages/rights/rights';

class App extends React.Component {
  state = {
    phones: [],
    isLoading: false,
    isLoaded: false,
    itemsInBasket: [],
  };

  componentDidMount() {
    const itemsFromBasketInLocal = JSON.parse(
      localStorage.getItem('itemsFromBasketInLocal')
    );

    if (itemsFromBasketInLocal !== null) {
      this.setState({
        itemsInBasket: itemsFromBasketInLocal,
      });
    }
  }

  basketManager = (id, operation) => {
    const currentIndex = this.state.itemsInBasket.findIndex(
      element => element.id === id
    );

    this.setState(
      (prevState) => {
        let changedArray = [...prevState.itemsInBasket];

        switch (operation) {
          case 'increase':
            return (changedArray[currentIndex].quantity += 1);
          case 'decrease':
            changedArray[currentIndex].quantity === 1
              ? (changedArray = changedArray.filter(obj => obj.id !== id))
              : (changedArray[currentIndex].quantity -= 1);
            break;
          case 'remove':
            changedArray = changedArray.filter(obj => obj.id !== id);
            break;
          case 'removeAll':
            changedArray = [];
            break;
          default:
            break;
        }

        return {
          itemsInBasket: changedArray,
        };
      },
      () => {
        localStorage.setItem(
          'itemsFromBasketInLocal',
          JSON.stringify(this.state.itemsInBasket)
        );
      }
    );
  };

  addItemToBasket = (itemToAdd) => {
    const currentIndex = this.state.itemsInBasket.findIndex(
      element => element.id === itemToAdd.id
    );

    if (currentIndex < 0) {
      const requiredItem = { ...itemToAdd };

      requiredItem.quantity = 1;

      this.setState(
        prevState => ({
          itemsInBasket: [...prevState.itemsInBasket, requiredItem],
        }),
        () => {
          localStorage.setItem(
            'itemsFromBasketInLocal',
            JSON.stringify(this.state.itemsInBasket)
          );
        }
      );
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
    // eslint-disable-next-line object-curly-newline
    const { phones, isLoading, isLoaded, itemsInBasket } = this.state;

    return (
      <div className="app">
        <Navbar itemsInBasket={itemsInBasket} />

        <Switch>
          <Route path="/" exact component={Index} />
          <Route
            path="/phones"
            exact
            render={({ location, history }) => (
              <LoaderOfPhones
                addItemToBasket={this.addItemToBasket}
                loadDataPhones={this.loadDataPhones}
                phones={phones}
                isLoading={isLoading}
                isLoaded={isLoaded}
                location={location}
                history={history}
                itemsInBasket={itemsInBasket}
              />
            )}
          />
          <Route
            path="/phones/:id?"
            render={({ match }) => (
              <LoaderForPhone
                id={match.params.id}
                phones={phones}
                itemsInBasket={itemsInBasket}
                addItemToBasket={this.addItemToBasket}
                loadDataPhones={this.loadDataPhones}
              />
            )}
          />
          <Route
            path="/basket"
            render={() => (
              <Basket
                itemsInBasket={itemsInBasket}
                basketManager={this.basketManager}
              />
            )}
          />
          <Route path="/rights" exact render={() => <Rights />} />
          <Route component={Page404} />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default App;
