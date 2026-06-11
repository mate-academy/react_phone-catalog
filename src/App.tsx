import { Route, Routes } from 'react-router-dom';
import './App.scss';

import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Layout } from './components/Layout/Layout';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { Cart, CartItem } from './pages/Cart';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Favorites } from './pages/Favorites';
import { useEffect, useState } from 'react';

import { ProductCardData } from './components/ProductCard/ProductCard';
import { CartContext } from './context/CartContext';
import { FavoritesContext } from './context/FavoritesContext';

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
