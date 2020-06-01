import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../HomePage/HomePage';

const Main = () => {
  return (
    <main className="main">
      <div className="container">
        <Switch>
          <Route path="/" exact component={() => <HomePage />} />
          <Route path="/phones" component={() => <h1>Phones</h1>} />
          <Route path="/tablets" component={() => <h1>Tablets</h1>} />
          <Route path="/accessories" component={() => <h1>Accessories</h1>} />
        </Switch>
      </div>
    </main>
  );
};

export default Main;
