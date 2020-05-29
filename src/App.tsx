import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import { getProducts } from './helpers/api';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage products={products} />
        </Route>
        <Route path="/phones">
          <PhonesPage />
        </Route>
        <Route path="/tablets">
          <TabletsPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
