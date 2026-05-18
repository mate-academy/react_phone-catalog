import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import './App.scss';
// eslint-disable-next-line max-len
import { ErrorNotification } from './Components/ErrorNotification/ErrorNotification';
import { Phones } from './Components/Phones/Phones';
import { Tablets } from './Components/Tablets/Tablets';
import { Accessories } from './Components/Accessories/Accessories';
import { PhoneSpec } from './Components/DevSpec/PhoneSpec';
import { CartProvider } from './Context/Context';
import { FavProvider } from './Context/FavouritesContext';
import React from 'react';
import { TabletSpec } from './Components/DevSpec/TabletSpec';
import { AccSpec } from './Components/DevSpec/AccSpec';
import { Cart } from './Components/Cart/Cart';
import { Favourites } from './Components/Favourites/Favourites';

export const Root = () => (
  <Router>
    <FavProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="phones" element={<Phones />} />
          <Route path="tablets" element={<Tablets />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="phones/:productId" element={<PhoneSpec />} />
          <Route path="tablets/:productId" element={<TabletSpec />} />
          <Route path="accessories/:productId" element={<AccSpec />} />
          <Route path="*" element={<ErrorNotification />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/basket" element={<Cart />} />
        </Routes>
      </CartProvider>
    </FavProvider>
  </Router>
);
