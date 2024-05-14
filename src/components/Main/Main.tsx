import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import Home from '../Home/Home';

register();

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} index />
      </Routes>
    </main>
  );
};

export default Main;
