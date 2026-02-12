import './App.scss';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './componenst/Layout';
import HomePage from './pages/HomePage';
import Products from './pages/ProductPages';
import Favourites from './pages/Favourites';
import Cart from './pages/Cart';
import React from 'react';

export const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="products"
          element={<Navigate to="/products/phones" replace />}
        />
        <Route path="products/:category" element={<Products />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  </HashRouter>
);

export default App;
