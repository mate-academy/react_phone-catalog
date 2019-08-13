import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import PhonesPage from './components/PhonesPage';
import HomePage from './components/HomePage';
import PhoneDetailsPage from './components/PhoneDetailsPage';
import Basket from './components/Basket';
import NotFoundPage from './components/NotFoundPage';

class App extends React.Component {
  state = {
    selectedPhones: [],
  }

  componentDidMount() {
    if (localStorage.getItem('selectedPhones')) {
      this.setState({
        selectedPhones: JSON.parse(localStorage.getItem('selectedPhones')),
      });
    }
  }

  componentDidUpdate() {
    localStorage
      .setItem('selectedPhones', JSON.stringify(this.state.selectedPhones));
  }

  addPhone = (currentPhone) => {
    this.setState(prevState => ({
      selectedPhones: [...prevState.selectedPhones, {
        id: currentPhone.id,
        quantity: 1,
        image: currentPhone.imageUrl || currentPhone.images[0],
      }],
    }));
  };

  removePhone = (currentPhone) => {
    this.setState(prevState => ({
      selectedPhones: prevState.selectedPhones
        .filter(phone => phone.id !== currentPhone),
    }));
  };

  increaseQuantity = currentPhone => (
    this.setState((prevState) => {
      const increasindItem = prevState.selectedPhones
        .find(phone => phone.id === currentPhone);

      increasindItem.quantity += 1;

      return { selectedPhones: prevState.selectedPhones };
    })
  )

  decreaseQuantity = currentPhone => (
    this.setState((prevState) => {
      const decreasindItem = prevState.selectedPhones
        .find(phone => phone.id === currentPhone);

      decreasindItem.quantity -= 1;

      return {
        selectedPhones: prevState.selectedPhones
          .filter(phone => phone.quantity > 0),
      };
    })
  )

  render() {
    const { selectedPhones } = this.state;

    return (
      <div className="App">
        <Header
          selectedPhones={selectedPhones}
        />

        <Switch>
          <Route
            path="/"
            exact
            component={HomePage}
          />

          <Route
            path="/phones"
            exact
            render={() => (
              <PhonesPage
                addPhone={this.addPhone}
                selectedPhones={selectedPhones}
                increaseQuantity={this.increaseQuantity}
                decreaseQuantity={this.decreaseQuantity}
              />
            )}
          />

          <Route
            path="/details/:phoneId"
            exact
            render={({ match }) => (
              <PhoneDetailsPage
                phoneId={match.params.phoneId}
                addPhone={this.addPhone}
                selectedPhones={selectedPhones}
                increaseQuantity={this.increaseQuantity}
                decreaseQuantity={this.decreaseQuantity}
              />
            )}
          />

          <Route
            path="/basket"
            exact
            render={() => (
              <Basket
                selectedPhones={selectedPhones}
                removePhone={this.removePhone}
                increaseQuantity={this.increaseQuantity}
                decreaseQuantity={this.decreaseQuantity}
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
