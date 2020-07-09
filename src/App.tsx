import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.scss';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { Footer } from './components/Footer';
import { TabletsPage } from './components/ProductPage/TabletsPage';
import { getProducts } from './api/api';
import { HomePage } from './components/HomePage';
import { PhonesPage } from './components/ProductPage/PhonesPage';
import { ProductInfo } from './components/ProductPage/ProductInfo';
import { FavouritePageRedux } from './components/Favourite/FavouritePageRedux';
import { CartPageRedux } from './components/Cart/CartPageRedux';
import { getCart, getFavorites } from './store/index';

const App: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const itemsCart = useSelector(getCart);
  const favorites = useSelector(getFavorites);

  getProducts().then(data => setProducts(data));

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([...itemsCart]));
  }, [itemsCart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  return (
    <div className="App">
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
              <PhonesPage />
            )}
          />
          <Route
            exact
            path="/tablets"
            render={() => (
              <TabletsPage />
            )}
          />
          <Route
            path={['/phones/:productId?', '/tablets/:productId?', '/accessories/:productId?']}
            render={({ match }) => {
              const prod = products.find(item => item.id === match.params.productId);

              if (prod) {
                return (
                  <ProductInfo product={prod} id={match.params.productId} />
                );
              }

              return <HomePage products={products} />;
            }}
          />
          <Route path="/favorite" exact component={FavouritePageRedux} />
          <Route path="/cart" exact component={CartPageRedux} />
          <Redirect from="/home" to="/" />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
