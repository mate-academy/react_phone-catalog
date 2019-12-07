import React from "react";
import "./styles/app.scss";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoaderPageOfPhones from "./pages/LoaderPageOfPhones";
import Page404 from "./pages/Page404";
import LoaderDetailsForOnePhone from "./pages/LoaderDetailsForOnePhone";
import BasketPage from "./pages/BasketPage";
import { BASE_URL } from "./components/constants";
import Footer from "./components/Footer";

class App extends React.Component {
  state = {
    phones: [],
    isLoading: false,
    isLoaded: false,
    itemsInBasket: []
  };

  componentDidMount() {
    const itemsFromBasketInLocal = JSON.parse(
      localStorage.getItem("itemsFromBasketInLocal")
    );

    if (itemsFromBasketInLocal !== null) {
      this.setState({
        itemsInBasket: itemsFromBasketInLocal
      });
    }
  }

  basketManager = (id, operation) => {
    const currentIndex = this.state.itemsInBasket.findIndex(
      element => element.id === id
    );

    this.setState(
      prevState => {
        let changedArray = [...prevState.itemsInBasket];

        switch (operation) {
          case "increase":
            return (changedArray[currentIndex].quantity += 1);
          case "decrease":
            changedArray[currentIndex].quantity === 1
              ? (changedArray = changedArray.filter(obj => obj.id !== id))
              : (changedArray[currentIndex].quantity -= 1);
            break;
          case "remove":
            changedArray = changedArray.filter(obj => obj.id !== id);
            break;
          case "removeAll":
            changedArray = [];
            break;
          default:
            console.log("Данный случай отстуствует среди условий");
        }

        return {
          itemsInBasket: changedArray
        };
      },
      () => {
        localStorage.setItem(
          "itemsFromBasketInLocal",
          JSON.stringify(this.state.itemsInBasket)
        );
      }
    );
  };

  addItemToBasket = itemToAdd => {
    const currentIndex = this.state.itemsInBasket.findIndex(
      element => element.id === itemToAdd.id
    );

    if (currentIndex < 0) {
      const requiredItem = { ...itemToAdd };

      requiredItem.quantity = 1;

      this.setState(
        prevState => ({
          itemsInBasket: [...prevState.itemsInBasket, requiredItem]
        }),
        () => {
          localStorage.setItem(
            "itemsFromBasketInLocal",
            JSON.stringify(this.state.itemsInBasket)
          );
        }
      );
    }
  };

  loadDataPhones = async () => {
    this.setState({
      isLoaded: false,
      isLoading: true
    });

    const responsePhones = await fetch(`${BASE_URL}/api/phones.json`);
    const phones = await responsePhones.json();

    this.setState({
      phones,
      isLoading: false,
      isLoaded: true
    });
  };

  render() {
    const { phones, isLoading, isLoaded, itemsInBasket } = this.state;

    return (
      <div className="app">
        <Navbar itemsInBasket={itemsInBasket} />

        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/phones"
            exact
            render={({ location, history }) => (
              <LoaderPageOfPhones
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
              <LoaderDetailsForOnePhone
                id={match.params.id}
                phones={phones}
                itemsInBasket={itemsInBasket}
                addItemToBasket={this.addItemToBasket}
                loadDataPhones={this.loadDataPhones}
              />
            )}
          />
          <Route
            path="/basket/"
            render={() => (
              <BasketPage
                itemsInBasket={itemsInBasket}
                basketManager={this.basketManager}
              />
            )}
          />
          <Route component={Page404} />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default App;
