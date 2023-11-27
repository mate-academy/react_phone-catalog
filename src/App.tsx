import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './styles/globals.scss';

import SearchProvider from './context/searchContext/SearchContext';
import CartProvider from './context/cartContext/CartContext';
import FavouritesProvider
  from './context/favouritesContext/FavoritesContext';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/home/HomePage';
import ItemPage from './pages/item/ItemPage';
import PhonesPage from './pages/phones/PhonesPage';
import NoResults from './components/noResults/NoResults';
import Favourites from './pages/favourites/Favourites';
import Cart from './pages/cart/Cart';
import ScrollToTop from './helpers/ScrollToTop';

const App: React.FC = () => {
  ScrollToTop();

  return (
    <CartProvider>
      <FavouritesProvider>
        <SearchProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />

              <Route
                path="home"
                element={<HomePage />}
              />

              <Route
                path="*"
                element={<NoResults title="Page" />}
              />

              <Route path="phones">
                <Route
                  index
                  element={<PhonesPage />}
                />

                <Route
                  path=":itemId"
                  element={<ItemPage />}
                />
              </Route>

              <Route
                path="tablets"
                element={<NoResults title="Tablets" />}
              />

              <Route
                path="accessories"
                element={<NoResults title="Accessories" />}
              />

              <Route
                path="cart"
                element={<Cart />}
              />

              <Route
                path="favourites"
                element={<Favourites />}
              />
            </Routes>
            <Footer />
          </div>
        </SearchProvider>
      </FavouritesProvider>
    </CartProvider>
  );
};

export default App;
