import './App.scss';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './componenst/Layout';
import HomePage from './pages/HomePage';
import Products from './pages/ProductPages';
import ProductDetails from './pages/ProductDetails';
import Favourites from './pages/Favourites';
import Cart from './pages/Cart';
import NotFoundPage from './pages/NotFoundPage';
import React from 'react';
import { CartProvider } from './context/CartContext';
import { FavouritesProvider } from './context/FavouritesContext';

export const App = () => (
  <CartProvider>
    <FavouritesProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="products"
              element={<Navigate to="/products/phones" replace />}
            />
            <Route path="products/:category" element={<Products />} />
            <Route
              path="product/:category/:productId"
              element={<ProductDetails />}
            />
            <Route path="favourites" element={<Favourites />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </FavouritesProvider>
  </CartProvider>
);

export default App;
