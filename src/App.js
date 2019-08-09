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

  addPhone = (currentPhone) => {
    this.setState((prevState) => {
      const updatedPhones = prevState.selectedPhones
        .find(phone => phone.id === currentPhone.id)
        ? (
          prevState.selectedPhones.map(phone => (
            phone.id === currentPhone.id
              ? {
                ...phone,
                quantity: phone.quantity + 1,
              }
              : phone
          ))
        ) : (
          [...prevState.selectedPhones, {
            id: currentPhone.id,
            quantity: 1,
            image: currentPhone.imageUrl || currentPhone.images[0],
          }]
        );

      return {
        selectedPhones: updatedPhones,
      };
    });
  };

  removePhone = (currentPhone) => {
    this.setState(prevState => ({
      selectedPhones: prevState.selectedPhones
        .filter(phone => phone.id !== currentPhone),
    }));
  };

  increaseQuantity = () => (
    this.setState(prevState => ({
      selectedPhones: prevState.selectedPhones.map(phone => ({
        ...phone,
        quantity: phone.quantity + 1,
      })),
    }))
  )

  decreaseQuantity = () => (
    this.setState(prevState => ({
      selectedPhones: prevState.selectedPhones
        .map(phone => (
          phone.quantity > 0
            ? {
              ...phone,
              quantity: phone.quantity - 1,
            }
            : phone
        ))
        .filter(phone => phone.quantity > 0),
    }))
  )

  render() {
    const { selectedPhones } = this.state;

    return (
      <div className="App">
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
                to="/phones"
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
              />
            )}
          />

          <Route
            path="/phones/:phoneId"
            render={({ match }) => (
              <PhoneDetailsPage
                phoneId={match.params.phoneId}
                addPhone={this.addPhone}
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
