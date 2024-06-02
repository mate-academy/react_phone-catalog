import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import HomePage from '../HomePage/HomePage';
import GadgetsPage from '../GadgetsPage/GadgetsPage';
import { PageType } from 'src/types/PageType';
import CartPage from '../CartPage/CartPage';
import './MainStyle.scss';

register();

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} index />
        <Route path="phones" element={<GadgetsPage type={PageType.Phones} />} />
        <Route
          path="tablets"
          element={<GadgetsPage type={PageType.Tablets} />}
        />
        <Route
          path="accessories"
          element={<GadgetsPage type={PageType.Accessories} />}
        />
        <Route
          path="favoutire"
          element={<GadgetsPage type={PageType.Favourite} />}
        />
        <Route path="cart" element={<CartPage />} />
      </Routes>
    </main>
  );
};

export default Main;
