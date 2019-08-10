import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage'
import PhoneCatalog from './components/PhoneCatalog'
import PageError from './components/PageError'
import Cart from './components/Cart'

class App extends React.Component {
  state = {
    selectedPhone: [],
  }

  handleClickAddPhoneToCart = currentPhone => {
    this.setState(prevState => {
      const phoneToCard = prevState.selectedPhone.find(phone => phone.id === currentPhone.id)
        ? (prevState.selectedPhone.map(phone => (
            phone.id === currentPhone.id
             ? {
               ...phone,
               amount: phone.amount + 1,
              }
             : phone
          ))
        ) : ([...prevState.selectedPhone, {
                name: currentPhone.name,
                id: currentPhone.id,
                image: currentPhone.imageUrl || currentPhone.images[0],
                amount: 1,
        }])

      return { selectedPhone: phoneToCard, }
    })
  }

  deletePhone = currentPhone => {
    this.setState(prevState => ({
      selectedPhone: prevState.selectedPhone.filter(phone => phone.id !== currentPhone)
    }))
  };

  changeAmountPlus = (currentPhone) => {
    this.setState(prevState => ({
      selectedPhone: prevState.selectedPhone.map(phone =>
        (phone.id === currentPhone)
          ? { ...phone, amount: phone.amount + 1 }
          : { ...phone }
      )
    }))
  }

  changeAmountMinus = currentPhone => {
    this.setState(prevState => ({
      selectedPhone: prevState.selectedPhone.map(phone =>
        (phone.id === currentPhone) && (phone.amount > 1)
          ? { ...phone, amount: phone.amount -1 }
          : { ...phone }
      )
    }))
  }


  render () {
    return (
      <div className="App">
        <nav>
          <ul className="nav-list">
            <li>
              <NavLink
                to="/"
                exact
              >
                <div className="logo-size">
                  <div className="logo"></div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
              >
                <p className="cart-amount">{this.state.selectedPhone.length}</p>
                <div className="cart"></div>
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
          <Route
            exact
            path="/"
            render={() => (
              <HomePage />
            )}
          />
          <Route
            exact
            path={`/phones/:id?`}
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
                selectedPhone={this.state.selectedPhone}
                deletePhone={this.deletePhone}
                changeAmountPlus={this.changeAmountPlus}
                changeAmountMinus={this.changeAmountMinus}
              />
            )}
          />
          <Route component={PageError} />
        </Switch>
      </div>
    )
  }
}


export default App;
