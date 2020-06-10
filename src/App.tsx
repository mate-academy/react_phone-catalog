import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import { FavContextWrap } from './components/Favourite/FavProductsContext';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { Footer } from './components/Footer';
import { TabletsPage } from './components/ProductPage/TabletsPage';
import { getProducts } from './api/api';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/ProductPage/PhonesPage';
import { FavouritePage } from './components/Favourite/FavouritePage';

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [phones, setPhones] = useState<ProductItem[]>([]);
  const [tablets, setTablets] = useState<ProductItem[]>([]);
  // const [accessories] = useState<ProductItem[]>([]);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setPhones(data.filter((product: ProductItem) => product.type === 'phone'));
        setTablets(data.filter((product: ProductItem) => product.type === 'tablet'));
        // setTablets(data.filter((product: ProductItem) => product.type === 'accessories'));
      });
  }, []);

  return (
    <div className="App">
      <FavContextWrap>
        <Header />
        <main className="main">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <HomePage products={products} />
              )}
            />
            <Route
              exact
              path="/phones"
              render={() => (
                <PhonesPage phones={phones} />
              )}
            />
            <Route
              exact
              path="/tablets"
              render={() => (
                <TabletsPage tablets={tablets} />
              )}
            />
            <Route path="/favorite" exact component={FavouritePage} />
            <Redirect from="/home" to="/" />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
        <Footer />
      </FavContextWrap>
    </div>
  );
};

export default App;
