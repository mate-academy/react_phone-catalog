import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import { Navigation } from './Navigation/navigation';
import { HomePage } from './Home_Page/homePage';
import { Catalog } from './Catalog/catalog';
import { Favourites } from './Favourites/favourites';
import { Cart } from './Cart/cart';
import { Maintenance } from './Additionals/underMaintenance';
import { Footer } from './Footer/footer';

const App = () => (
  <div className="App">
    <Navigation />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/phones/:id?" component={Catalog} />
      <Route path="/tablets/:id?" component={Maintenance} />
      <Route path="/accessories" component={Maintenance} />
      <Route path="/favourites" component={Favourites} />
      <Route path="/cart" component={Cart} />
    </Switch>
    <Footer />
  </div>
);

export default App;
