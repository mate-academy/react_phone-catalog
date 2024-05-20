import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import HomePage from '../HomePage/HomePage';

register();

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} index />
      </Routes>
    </main>
  );
};

export default Main;
