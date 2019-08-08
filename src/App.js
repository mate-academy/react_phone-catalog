import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { getPhones } from './API_DATA';

import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import BasketItems from './components/BasketItems';
import NoMatch from './components/NoMatch';
import PhoneDetailsPage from './components/PhoneDetailsPage';
import PhoneCatalog from './components/PhoneCatalog';

const App = () => {
  const [phones, setPhones] = useState([]);
  const [basketPhones, chandgeBasketItems] = useState([]);

  useEffect(() => {
    (async() => {
      const temp = await getPhones();

      setPhones(temp);
    })();
  }, []);

  return (
    <div className="App">
      <Navigation basketPhones={basketPhones} />

      <Switch>
        <Route path="/" exact component={HomePage} />

        <Route
          path="/phones"
          exact
          render={() => (
            <main className="main-container">
              <h1>
                Phones number:
                {phones.length}
              </h1>

              <PhoneCatalog
                phones={phones}
                chandgeBasketItems={chandgeBasketItems}
                basketPhones={basketPhones}
              />
            </main>
          )}
        />

        <Route
          path="/phones/:phoneId?"
          render={({ match }) => {
            const { phoneId } = match.params;
            const phone = phones.find(currPhone => currPhone.id === phoneId);

            return (
              <PhoneDetailsPage
                phone={phone}
                phoneId={phoneId}
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

        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

export default App;
