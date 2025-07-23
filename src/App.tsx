import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.scss';

import { BannerSwiper } from './components/BannerSwiper';
import { Header } from './components/Header';
import { SwiperSection } from './components/SwiperSection';
// import { PhoneCard } from './components/PhoneCard';

import './styles/style.scss';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className='section'>
          <div className="title-section">
            <h1 className="title">Welcome to Nice Gadgets store!</h1>
          </div>

          <BannerSwiper />
        </div>

        {/* <BrendNewModels /> */}

        <SwiperSection />
      </main>

      {/* <Routes> */}
      {/* <Route path="/" element={<BurgerNavigation />} /> */}
      {/* </Routes> */}
      {/* <Outlet />
      <footer></footer> */}
    </div>
  );
};
