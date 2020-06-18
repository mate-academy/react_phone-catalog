import React, { useState, useEffect } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProducts } from './helpers/api';
import Header from './components/Header/Header';
import { Home } from './components/Home/Home';
import { MobilePhonesPage } from './components/MobilePhonesPage/MobilePhonesPage';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from './components/ProductDetailsPage/ProductDetailsPage';
import Footer from './components/Footer/Footer';
import FavoritesPage from './components/FavoritesPage/FavoritesPage';
import CartPage from './components/CartPage/CartPage ';
import Checkout from './components/Checkout/Checkout';
import { getFavorites, getItems } from './store/index';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PhoneWasNotFound } from './components/PhoneWasNotFound/PhoneWasNotFound';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const favoriteProducts = useSelector(getFavorites);
  const itemsCart = useSelector(getItems);

  getProducts().then(data => setProducts(data));
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favoriteProducts]));
  }, [favoriteProducts]);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify([...itemsCart]));
  }, [itemsCart]);

  return (
    <div className="App">
      <Header />
      <main className="Main">
        <Switch>
          {products.map((product: Product) => {
            let base = '/';

            switch (product.type) {
              case 'phone':
                base = '/phones';
                break;
              case 'tablet':
                base = '/tablets';
                break;
              default:
                base = '/accessories';
            }

            return (
              <Route
                key={product.id}
                path={`${base}/:productId`}
              >
                <ProductDetailsPage />
              </Route>
            );
          })}
          <Route path="/home" exact component={Home} />
          <Route path="/phones" exact component={MobilePhonesPage} />
          <Route path="/tablets" exact component={TabletsPage} />
          <Route path="/accessories" component={AccessoriesPage} />
          <Route path="/favorites" exact component={FavoritesPage} />
          <Route path="/cart" exact component={CartPage} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/home/:productId" exact component={ProductDetailsPage} />
          <Route path="/phoneWasNotFound" exact component={PhoneWasNotFound} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};


export default App;
