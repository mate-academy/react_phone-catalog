/* eslint-disable default-case */
import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

// no module
import PhoneCatalog from './Phone/PhoneCatalog';
import PhoneDetailsPage from './Phone/PhoneDetailsPage';
import NotFoundPage from './NotFoundPage';
import BasketItems from './Basket/BasketItems';
import HomePage from './HomePage';

// get from Api
import { getPhones } from './Phone/getAPIDoc';

// styles scss
import './Phone/scss/App.scss';

const getSorted = (array, sortField) => {
  const sortBy = {
    alphabet: (a, b) => a.name.localeCompare(b.name),
  };

  const callback = sortBy[sortField];

  return [...array].sort(callback);
};

class App extends React.Component {
  static defaultProps = {
    currentArray: PropTypes.shape(),
    phonesToBasket: PropTypes.shape(),
  }

  state = {
    phones: [],
    phonesVisible: [],
    phonesToBasket: [],
    sortField: '',
    isopenRegister: false,
    isLoaded: false,
  }

  componentWillMount() {
    if (localStorage.getItem('phonesToBasket')) {
      this.setState({
        phonesToBasket: JSON.parse(localStorage.getItem('phonesToBasket')),
      });
    }
  }

  async componentDidMount() {
    const phones = await getPhones();

    this.setState({
      phones,
      phonesVisible: phones,
    });
  }

  componentDidUpdate() {
    localStorage.setItem('phonesToBasket',
      JSON.stringify(this.state.phonesToBasket));
  }

  handleBasket = (id, operation) => {
    const indexPhone = this.state.phonesToBasket
      .findIndex(phone => phone.id === id);

    this.setState((prevState) => {
      let currentArray = [...prevState.phonesToBasket];

      switch (operation) {
        case 'increase':
          // eslint-disable-next-line no-return-assign
          return currentArray[indexPhone].quantity += 1;
        case 'decrease':
          currentArray[indexPhone].quantity === 1
            ? currentArray = currentArray.filter(obj => obj.id !== id)
            : currentArray[indexPhone].quantity -= 1;
          break;
        case 'remove':
          currentArray = currentArray.filter(obj => obj.id !== id);
          break;
      }

      return {
        phonesToBasket: currentArray,
      };
    });
  }

  setItemToBasket = (phoneName, id) => {
    if (this.state.phonesToBasket.find(item => item.phone === phoneName)) {
      this.setState(prevState => ({
        phonesToBasket: [
          ...prevState.phonesToBasket
            .filter(phone => (phone.phone !== phoneName)),
          {
            cost: (Math.random() * 100).toFixed(2),
            quantity: prevState.phonesToBasket
              .find(phone => phone.phone === phoneName).quantity + 1,
            phone: phoneName,
            id,
          },
        ],
      }));
    } else {
      this.setState(prevState => ({
        phonesToBasket: [
          ...prevState.phonesToBasket,
          {
            quantity: 1,
            cost: (Math.random() * 100).toFixed(2),
            phone: phoneName,
            id,
          },
        ],
      }));
    }
  }

  handleFilter = (event) => {
    const { value } = event.target;

    this.setState((prevState) => {
      const filterArray = prevState.phones
        .filter(phone => [phone.name]
          .join()
          .toLowerCase()
          .includes(value.toLowerCase()));

      return { phonesVisible: getSorted(filterArray, prevState.sortField) };
    });
  }

  handleSort = () => {
    this.setState(prevState => ({
      phonesVisible: getSorted(prevState.phones, 'alphabet'),
      sortField: 'alphabet',
    }));
  }

  handleOpenFinishWindow = (info) => {
    if (info.name.length > 0
      && info.email.length > 0
      && info.phone.length > 0
    ) {
      this.setState({
        isLoaded: true,
        isopenRegister: false,
      });
    }
  }

  handleCloseRegister = () => {
    this.setState({
      isopenRegister: false,
    });
  }

  handleClose = () => {
    this.setState({
      isLoaded: false,
      phonesToBasket: [],
    });
  }

  handleOpenRegistr = () => {
    if (this.state.phonesToBasket.length !== 0) {
      this.setState({
        isopenRegister: true,
      });
    }
  }

  render() {
    const {
      phonesVisible, phonesToBasket, sortField, isopenRegister, isLoaded,
    } = this.state;
    const IMAGE_URL = 'https://mate-academy.github.io/phone-catalogue-static/';

    return (
      <div className="app">
        <div className="header">
          <nav className="nav__main-container">
            <NavLink
              to="/"
              exact
              className="page__home phone__position phones__page"
              activeClassName="phone__class-active"
            >
              <div className="app__logo">
                <div className="app__logo__title">Home</div>
              </div>
            </NavLink>
            <NavLink
              to="/phones"
              className="phones__page"
              activeClassName="phone__class-active"
            >
        Catalog
            </NavLink>
            <NavLink
              to="/basket"
              className="phones__page page__basket"
              activeClassName="phone__class-active"
            >
              { phonesToBasket.length === 0 ? ''
                : (
                  <div className="basket__animation">
                    {phonesToBasket.length}
                  </div>
                )}
              <div className="app__basket">
                <div className="app__basket__title">basket</div>
              </div>
            </NavLink>
          </nav>
        </div>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route
            path="/phones"
            exact
            render={() => (
              <PhoneCatalog
                phones={phonesVisible}
                IMAGE_URL={IMAGE_URL}
                handleFilter={this.handleFilter}
                handleSort={this.handleSort}
                setItemToBasket={this.setItemToBasket}
                sortField={sortField}
              />
            )}
          />
          <Route
            path="/phones/:phoneId?"
            exact
            render={({ match }) => (
              <PhoneDetailsPage
                phoneId={match.params.phoneId}
                IMAGE_URL={IMAGE_URL}
                phones={phonesVisible}
                handleClick={this.handleClick}
                setItemToBasket={this.setItemToBasket}
              />
            )}
          />
          <Route
            path="/basket"
            render={() => (
              <BasketItems
                phonesToBasket={phonesToBasket}
                handleBasket={this.handleBasket}
                isopenRegister={isopenRegister}
                handleOpenFinishWindow={this.handleOpenFinishWindow}
                isLoaded={isLoaded}
                handleOpenRegistr={this.handleOpenRegistr}
                handleClose={this.handleClose}
                handleCloseRegister={this.handleCloseRegister}
              />
            )}
          />
          <Route
            path="*"
            component={NotFoundPage}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
