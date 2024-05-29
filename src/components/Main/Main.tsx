import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import HomePage from '../HomePage/HomePage';
import GadgetsPage from '../GadgetsPage/GadgetsPage';
import { PageType } from 'src/types/PageType';

register();

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} index />
        <Route path="phones" element={<GadgetsPage type={PageType.Phones} />} />
      </Routes>
    </main>
  );
};

export default Main;
