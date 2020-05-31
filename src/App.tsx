import React, { useState, useEffect } from 'react';

import './styles/App.scss';

import { Switch, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './components/HomePage/HomePage';
import { getProducts } from './helpers/api';
import { Product } from './helpers/interfaces';

const App = () => {
  const [productsFromServer, setProductsFromServer] = useState([] as Product[]);
  // const [error, setError] = useState<boolean>(false);

  useEffect(
    () => {
      getProducts().then(products => {
        if (products) {
          setProductsFromServer(products);
        } else {
          // setError(true);
        }
      });
    }, [],
  );

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage products={productsFromServer} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
