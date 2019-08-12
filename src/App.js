import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import { getPhones } from './API_DATA';

import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import BasketItems from './components/BasketItems';
import NoMatch from './components/NoMatch';
import PhoneDetailsPage from './components/PhoneDetailsPage';
import PhoneCatalog from './components/PhoneCatalog';
import NoPhone from './components/NoPhone';

const App = () => {
  const [phones, setPhones] = useState([]);
  const [basketPhones, chandgeBasketItems] = useState([]);

  useEffect(() => {
    (async() => {
      const temp = await getPhones();

      setPhones(temp);
    })();

    const storagePhones = localStorage.getItem('basketPhones');

    if (storagePhones) {
      chandgeBasketItems(JSON.parse(storagePhones));
    }
  }, []);

  return (
    <div className="App">
      <Navigation basketPhones={basketPhones} />

      <Switch>
        <Route path="/" exact component={HomePage} />

        <Route
          path="/phones"
          exact
          render={({ location, history }) => (
            <PhoneCatalog
              phones={phones}
              chandgeBasketItems={chandgeBasketItems}
              basketPhones={basketPhones}
              history={history}
              location={location}
            />
          )}
        />

        <Route
          path="/phones/:phoneId?"
          render={({ match }) => {
            const { phoneId } = match.params;
            const phone = phones.find(currPhone => currPhone.id === phoneId);

            if ((phones.length > 0)
              // eslint-disable-next-line no-shadow
              && (!phones.some(phone => phone.id === phoneId))) {
              return (
                <NoPhone />
              );
            }

            return (
              <PhoneDetailsPage
                phone={phone}
                phoneId={phoneId}
                chandgeBasketItems={chandgeBasketItems}
                basketPhones={basketPhones}
              />
            );
          }}
        />

        <Route
          path="/basket"
          render={() => (
            <BasketItems
              basketPhones={basketPhones}
              chandgeBasketItems={chandgeBasketItems}
            />
          )}
        />

        <Route
          path="/rights"
          component={RightsPage}
        />

        <Route component={NoMatch} />
      </Switch>

      <footer className="footer">
        <a
          href="https://github.com/mate-academy/react_phone-catalog/pull/3"
          target="blank"
          title="GitHub"
        >
          GitHub Link
        </a>

        <Link to="/rights">
          Rights
        </Link>
      </footer>
    </div>
  );
};

const RightsPage = () => (
  <main className="main-container">
    <h2>Rights and used materials</h2>

    <ul className="rights-list">
      <li>
        <a href="https://www.freepik.com/free-photos-vectors/logo">
          Logo vector created by freepik - www.freepik.com
        </a>
      </li>

      <li>
        {/* eslint-disable-next-line */}
        <a href="https://dribbble.com/shots/2597126-404-Got-Lost?ref=blogduwebdesign.com">
          404 Got Lost by Anastasiia Andriichuk in Swifty App
        </a>
      </li>

      <li>
        For other materials, all rights reservd thay owners
        (unfortunatly authors can
        {"'"}
t be found)
      </li>
    </ul>
  </main>
);

export default App;
