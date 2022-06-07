/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { CartPage } from './components/CartPage';
import { CartItem } from './types/CardItem';

import './App.scss';
import { FavoritesPage } from './components/FavoritesPage';
import { NotFoundPage } from './components/NotFoundPage';

type ShopContextType = {
  quantity: number;
  setQuantity: React.Dispatch<number>;
  favoriteCount: number;
  setFavouriteCount: React.Dispatch<number>;
};

export const ShopContext = React.createContext<ShopContextType>({
  quantity: 0,
  setQuantity: () => {},
  favoriteCount: 0,
  setFavouriteCount: () => {},
});

const quantityValue
  = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') || '')
      .reduce((acc: number, item: CartItem) => acc + item.quantity, 0)
    : 0;

const favourites
  = localStorage.getItem('favouritesItems')
    ? JSON.parse(localStorage.getItem('favouritesItems') || '').length
    : 0;

const App: React.FC = () => {
  const [quantity, setQuantity] = useState(quantityValue);
  const [favoriteCount, setFavoriteCount] = useState(favourites);

  const shopContextValue = {
    quantity,
    setQuantity,
    favoriteCount,
    setFavouriteCount: setFavoriteCount,
  };

  return (
    <div className="wrapper App">
      <Header
        quantity={quantity}
        favorites={favoriteCount}
      />
      <ShopContext.Provider value={shopContextValue}>
        <main className="main App__main">
          <div className="main__content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/phones"
                element={<ProductsPage type="Phones" />}
              />
              <Route
                path="/phones/:productId"
                element={<ProductDetailsPage />}
              />
              <Route
                path="/tablets"
                element={
                  <ProductsPage type="Tablets" />
                }
              />
              <Route
                path="/tablets/:productId"
                element={<ProductDetailsPage />}
              />
              <Route
                path="/accessories"
                element={
                  <ProductsPage type="Accessories" />
                }
              />
              <Route
                path="/accessories/:productId"
                element={<ProductDetailsPage />}
              />
              <Route
                path="/cart"
                element={(
                  <CartPage
                    productQuantity={quantity}
                    onChangeQuantity={setQuantity}
                  />
                )}
              />
              <Route
                path="/favorites"
                element={(
                  <FavoritesPage
                    favouriteCount={favoriteCount}
                  />
                )}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </ShopContext.Provider>

      <Footer />
    </div>
  );
};

export default App;
