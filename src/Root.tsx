import React  from 'react';
import { App } from './App';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { HomePage } from './modules/HomePage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';
import { NotFoundPage} from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';

export const Root = () => {
  return (
    <Router>
      <div>
        <React.Fragment />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/home" component={HomePage} />
          <Route path="/phones" component={PhonesPage} />
          <Route path="/tablets" component={TabletsPage} />
          <Route path="/accessories" component={AccessoriesPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/favorites" component={FavoritesPage} />
          <Route path="/product" component={ProductDetailsPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};
