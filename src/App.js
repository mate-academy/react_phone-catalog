import React from 'react';
import './App.css';
import { Route, Switch, NavLink } from 'react-router-dom';

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
        .filter(phone => phone.id === currentPhone)[0];

      increasindItem.quantity += 1;

      return { selectedPhones: prevState.selectedPhones };
    })
  )

  decreaseQuantity = currentPhone => (
    this.setState((prevState) => {
      const decreasindItem = prevState.selectedPhones
        .filter(phone => phone.id === currentPhone)[0];

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
        <header>
          <nav className="navigation">
            <ul>
              <li className="navigation__list-paragraph">
                <NavLink
                  to="/"
                  exact
                  className="navigation__link"
                  activeClassName="is-active"
                >
                  Home
                </NavLink>
              </li>

              <li className="navigation__list-paragraph">
                <NavLink
                  to={{
                    pathname: '/phones',
                    search: 'page=1&perPage=5&sort=age',
                  }}
                  exact
                  className="navigation__link"
                  activeClassName="is-active"
                >
                  Phones
                </NavLink>
              </li>
            </ul>
            <div className="navigation__list-paragraph">
              <NavLink
                to="/basket"
                exact
                className="navigation__link basket"
                activeClassName="is-active"
              >
                <img
                  src="img/basket.png"
                  className="basket__img"
                  alt="basket"
                />
              </NavLink>

              {selectedPhones.length > 0
                ? (
                  <span className="basket__added-items-quantity">
                    {selectedPhones.length}
                  </span>
                ) : <></>
              }
            </div>
          </nav>
        </header>

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
