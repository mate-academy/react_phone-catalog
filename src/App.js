import React from 'react';
import './App.css';
import { Route, NavLink, Switch } from 'react-router-dom';

import PhoneCatalog from './PhoneCatalog';
import PhoneDetailsPage from './PhoneDetailsPage';
import NotFoundPage from './NotFoundPage';
import BasketItems from './BasketItems';
import { getPhones } from './getAPIDoc';

const HomePage = () => (
  <div className="home_page">
    Hello
  </div>
);

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
  }

  async componentDidMount() {
    const phones = await getPhones();

    this.setState({
      phones,
      phonesVisible: phones,
    });
  }

  setItemToBasket = (phoneName, imgUrl) => {
    this.setState(prevState => ({
      phonesToBasket: [
        ...prevState.phonesToBasket,
        {
          quantity: 1,
          phone: phoneName,
          imageUrl: imgUrl,
        },
      ],
    }));
  }

  handleFilter = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      phonesVisible: prevState.phones
        .filter(phone => [phone.name]
          .join()
          .toLowerCase()
          .includes(value.toLowerCase())),
    }));
  }

  handleSort = (sortField) => {
    const { value } = sortField.target;

    this.setState(prevState => ({
      phonesVisible: getSorted(prevState.phones, value),
    }));
  }

  render() {
    const { phonesVisible, phonesToBasket } = this.state;
    const urlImg = 'https://mate-academy.github.io/phone-catalogue-static/';

    return (
      <div className="App">
        <nav className="nav__main_container">
          <NavLink
            to="/"
            exact
            className="page__home phone__position"
            activeClassName="phoneClassActive"
          >
          Home
          </NavLink>
          <NavLink
            to="/phones"
            className="Phones__page"
            activeClassName="phoneClassActive"
          >
        PhonesPage
          </NavLink>
          <NavLink
            to="/basket"
            className="Phones__page"
            activeClassName="phoneClassActive"
          >
        BasketItems
          </NavLink>
        </nav>
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
