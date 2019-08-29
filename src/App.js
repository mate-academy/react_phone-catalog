import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import PhoneCatalog from './components/PhoneCatalog';
import PageError from './components/PageError';
import Footer from './components/Footer'
import Cart from './components/Cart';
import Contacts from './components/Contacts';


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
      <div className="app">
        <nav className="header">
          <ul className="nav-list">
            <li>
              <NavLink to="/" exact>
                <iframe src="//ntmaker.gfto.ru/newneontext/?image_height=100&image_width=200&image_font_shadow_width=30&image_font_size=30&image_background_color=000000&image_text_color=FF0000&image_font_shadow_color=F7406B&image_url=&image_text=Phone Catalog&image_font_family=CocaCola&" frameborder='no' scrolling='no' width="200" height="100"></iframe>
              </NavLink>
            </li>
            <li>
              <NavLink to="/" exact className="nav-list-link">
                <p className="home-page-link">Home Page</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-list-link"
                to="/phones"
              >
                <p className="phone-catalog">Phone Catalog</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="nav-list-link">
                <p className="cart-amount">{selectedPhones.length}</p>
                <p className="cart">Cart</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacts" className="nav-list-link">
                <p className="contacts">Contacts</p>
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
          <Route
            exact
            path="/contacts"
            render={() => (
              <Contacts />
            )}
          />
          <Route component={PageError} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
