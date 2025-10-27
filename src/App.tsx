import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { Header } from './layout/Header/Header';
import { Footer } from './layout/Footer/Footer';
import { HomePage } from './modules/HomePage/HomePage';
import { useContext, useEffect } from 'react';
import { StateContext } from './utils/GlobalContext';
import { KEY_CART, KEY_FAVOURITES } from './constants/localStorage';
import { PageNotFound } from './modules/PageNotFound/PageNotFound';
import { Catalor } from './modules/Catalog/Catalog';
import { ProductPage } from './modules/ProductPage/ProductPage';
import { ProductLayout } from './layout/ProductLayout/ProductLayout';
import { Favourites } from './modules/Favourites/Favourites';
import { Cart } from './modules/Cart/Cart';

export const App = () => {
  const { favourites, cart } = useContext(StateContext);

  useEffect(() => {
    localStorage.setItem(KEY_FAVOURITES, JSON.stringify(favourites));
    localStorage.setItem(KEY_CART, JSON.stringify(cart));
  }, [favourites, cart]);

  return (
    <div className="App">
      <Header />

      <main className="Main" data-theme="dark">
        <div className="Main__container">
          <Routes>
            <Route path={`/`} element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/:product" element={<ProductLayout />}>
              <Route index element={<Catalor />} /> {/* /product */}
              <Route path=":itemId" element={<ProductPage />} />{' '}
            </Route>
            <Route path="favourites" element={<Favourites />} />
            <Route path="cart" element={<Cart />} />
            <Route path="404" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
};
