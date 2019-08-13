import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import PhoneCatalog from './components/PhoneCatalog';
import PageError from './components/PageError';
import Cart from './components/Cart';

class App extends React.Component {
  state = {
    selectedPhones: [],
  }

  handleClickAddPhoneToCart = (currentPhone) => {
    this.setState((prevState) => {
      const phoneToCard = prevState.selectedPhones.find(phone => phone.id === currentPhone.id)
        ? (prevState.selectedPhones.map(phone => (
          phone.id === currentPhone.id
            ? {
              ...phone,
              amount: phone.amount + 1,
            }
            : phone
        ))
        ) : ([...prevState.selectedPhones, {
          name: currentPhone.name,
          id: currentPhone.id,
          image: currentPhone.imageUrl || currentPhone.images[0],
          amount: 1,
        }]);

      return { selectedPhones: phoneToCard };
    });
  }

  deletePhone = (currentPhone) => {
    this.setState(prevState => ({
      selectedPhones: prevState.selectedPhones.filter(phone => phone.id !== currentPhone),
    }));
  };

  increaseAmount = (currentPhone) => {
    this.setState(prevState => ({
      selectedPhones: prevState.selectedPhones.map(phone => ((phone.id === currentPhone)
        ? { ...phone, amount: phone.amount + 1 }
        : { ...phone })),
    }));
  }

  decreaseAmount = (currentPhone) => {
    this.setState(prevState => ({
      selectedPhones: prevState.selectedPhones.map(phone => ((phone.id === currentPhone) && (phone.amount > 1)
        ? { ...phone, amount: phone.amount - 1 }
        : { ...phone })),
    }));
  }

  render() {
    const { selectedPhones } = this.state;

    return (
      <div className="App">
        <nav>
          <ul className="nav-list">
            <li>
              <NavLink to="/" exact >
                <div className="logo-size">
                  <div className="logo" />
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                <p className="cart-amount">{selectedPhones.length}</p>
                <div className="cart" />
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-list-link"
                activeClassName="active-nav_link"
                to="/phones"
              >
                Phone Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" render={() => (<HomePage />)}/>
          <Route
            exact
            path="/phones/:id?"
            render={({ match }) => (
              <PhoneCatalog
                handleClickAddPhoneToCart={this.handleClickAddPhoneToCart}
                deletePhone={this.deletePhone}
                id={match.params.id}
              />
            )}
          />
          <Route
            path="/cart"
            render={() => (
              <Cart
                selectedPhones={selectedPhones}
                deletePhone={this.deletePhone}
                increaseAmount={this.increaseAmount}
                decreaseAmount={this.decreaseAmount}
              />
            )}
          />
          <Route component={PageError} />
        </Switch>
      </div>
    );
  }
}

export default App;
