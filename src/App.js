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

            <li className="navigation__list-paragraph">
              <NavLink
                to="/basket"
                exact
                className="navigation__link"
                activeClassName="is-active"
              >
                Basket
              </NavLink>
            </li>
          </ul>
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
