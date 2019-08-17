import React from 'react';
import './App.css';
import { Route, NavLink, Switch } from 'react-router-dom';

import PhoneCatalog from './PhoneCatalog';
import PhoneDetailsPage from './PhoneDetailsPage';
import NotFoundPage from './NotFoundPage';
import BasketItems from './BasketItems';
import { getPhones } from './getAPIDoc';
import HomePage from './HomePage';

const getSorted = (array, sortField) => {
  const sortBy = {
    alphabet: (a, b) => a.name.localeCompare(b.name),
  };

  const callback = sortBy[sortField];

  return [...array].sort(callback);
};

class App extends React.Component {
  state = {
    phones: [],
    phonesVisible: [],
    phonesToBasket: [],
    sortField: '',
  }

  async componentDidMount() {
    const phones = await getPhones();

    this.setState({
      phones,
      phonesVisible: phones,
    });
  }

  handleBasket = (id, operation) => {
    const indexPhone = this.state.phonesToBasket
      .findIndex(phone => phone.id === id);

    this.setState((prevState) => {
      let currentArray = [...prevState.phonesToBasket];

      // eslint-disable-next-line default-case
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

  setItemToBasket = (phoneName, imgUrl, id) => {
    if (this.state.phonesToBasket.find(item => item.phone === phoneName)) {
      this.setState(prevState => ({
        phonesToBasket: [
          ...prevState.phonesToBasket
            .filter(phone => (phone.phone !== phoneName)),
          {
            quantity: prevState.phonesToBasket
              .find(phone => phone.phone === phoneName).quantity + 1,
            phone: phoneName,
            imageUrl: imgUrl,
          },
        ],
      }));
    } else {
      this.setState(prevState => ({
        phonesToBasket: [
          ...prevState.phonesToBasket,
          {
            quantity: 1,
            phone: phoneName,
            imageUrl: imgUrl,
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

  handleSort = (sortField) => {
    const { value } = sortField.target;

    this.setState(prevState => ({
      phonesVisible: getSorted(prevState.phones, value),
      sortField: value,
    }));
  }

  render() {
    const { phonesVisible, phonesToBasket, sortField } = this.state;
    const urlImg = 'https://mate-academy.github.io/phone-catalogue-static/';

    return (
      <div className="App">
        <div className="header">
          <nav className="nav__main_container">
            <NavLink
              to="/"
              exact
              className="page__home phone__position Phones__page"
              activeClassName="phoneClassActive"
            >
              <div className="App__logo">
                <div className="App__logo__title">Home</div>
              </div>
            </NavLink>
            <NavLink
              to="/phones"
              className="Phones__page"
              activeClassName="phoneClassActive"
            >
        Catalog
            </NavLink>
            <NavLink
              to="/basket"
              className="Phones__page page__basket"
              activeClassName="phoneClassActive"
            >
              <div className="App__basket">
                <div className="App__basket__title">basket</div>
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
                urlImg={urlImg}
                handleFilter={this.handleFilter}
                handleSort={this.handleSort}
                setItemToBasket={this.setItemToBasket}
                sortField={sortField}
              />
            )}
          />
          <Route
            path="/phones/:phoneId"
            exact
            render={({ match }) => (
              <PhoneDetailsPage
                phoneId={match.params.phoneId}
                urlImg={urlImg}
                phones={phonesVisible}
              />
            )}
          />
          <Route
            path="/basket"
            render={() => (
              <BasketItems
                phonesToBasket={phonesToBasket}
                handleBasket={this.handleBasket}
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
