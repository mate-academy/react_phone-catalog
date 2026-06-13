import { Route, Routes } from 'react-router-dom';
import './App.scss';

import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { useEffect, useState } from 'react';

import { CartContext, CartItem } from './context/CartContext';
import { FavoritesContext } from './context/FavoritesContext';
import { HomePage } from './modules/HomePage/HomePage';
import { Phones } from './modules/Phones/Phones';
import { Tablets } from './modules/Tablets/Tablets';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { Favorites } from './modules/Favorites/Favorites';
import { ProductCardData } from './shared/types/ProductCardData';
import { Layout } from './shared/components/Layout';
import { Cart } from './modules/Cart/Cart';
import { Accessories } from './modules/Accessories/Accessories';

export const App = () => {
  const [favorites, setFavorites] = useState<ProductCardData[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App" data-cy="app">
      <FavoritesContext.Provider value={{ favorites, setFavorites }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />}></Route>
              <Route path="phones" element={<Phones />}></Route>
              <Route path="tablets" element={<Tablets />}></Route>
              <Route path="accessories" element={<Accessories />}></Route>
              <Route path="cart" element={<Cart />}></Route>
              <Route
                path="product/:productId"
                element={<ProductDetailsPage />}
              ></Route>
              <Route path="favorites" element={<Favorites />}></Route>
            </Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </CartContext.Provider>
      </FavoritesContext.Provider>
    </div>
  );
};
