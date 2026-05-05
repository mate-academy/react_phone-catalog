import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Home } from './Components/Home/Home';
// eslint-disable-next-line max-len
import { ErrorNotification } from './Components/ErrorNotification/ErrorNotification';
import { Phones } from './Components/Phones/Phones';
import { Tablets } from './Components/Tablets/Tablets';
import { Accessories } from './Components/Accessories/Accessories';
import { PhoneSpec } from './Components/Phone Spec/PhoneSpec';
import { CartProvider } from './Context/Context';
import { FavProvider } from './Context/FavouritesContext';
import React from 'react';

export const Root = () => (
  <Router>
    <FavProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="phones" element={<Phones />} />
            <Route path="tablets" element={<Tablets />} />
            <Route path="accessories" element={<Accessories />} />
            <Route path="product/:productId" element={<PhoneSpec />} />
          </Route>
          <Route path="*" element={<ErrorNotification />} />
        </Routes>
      </CartProvider>
    </FavProvider>
  </Router>
);
