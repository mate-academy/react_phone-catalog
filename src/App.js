import React from 'react';
import './App.css';
import { Route, NavLink, Switch } from 'react-router-dom';

import PhonesPage from './PhonesPage';
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
  }

  async componentDidMount() {
    const phones = await getPhones();

    this.setState(prevState => ({
      phones,
    }));
  }

  render() {
    const { phones } = this.state;

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
            path="/phones/:id?"
            render={({ match }) => (
              <PhonesPage
                phones={phones}
                match={match.params.id}
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
