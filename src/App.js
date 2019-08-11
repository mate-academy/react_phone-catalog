import React from 'react';
import './App.css';
import { Route, NavLink, Switch } from 'react-router-dom';

import PhoneCatalog from './PhoneCatalog';
import PhoneDetailsPage from './PhoneDetailsPage';
import NotFoundPage from './NotFoundPage';

const HomePage = () => (
  <div className="home_page">
    Hello
  </div>
);

const getPhones = async() => {
  const url = 'https://mate-academy.github.io/phone-catalogue-static';
  const response = await fetch(
    `${url}/api/phones.json`
  );

  const currentContent = await response.json();

  return currentContent;
};

class App extends React.Component {
  state = {
    phones: [],
    phonesVisible: [],
  }

  async componentDidMount() {
    const phones = await getPhones();

    this.setState({
      phones,
      phonesVisible: phones,
    });
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

  render() {
    const { phonesVisible } = this.state;
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
            path="*"
            component={NotFoundPage}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
