import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.scss';

// import { Header } from './components/header';
import MainSwiper from './components/mainSwiper/MainSwiper';
import { Header } from './components/header';

// import './components/Header/style.scss';
import './styles/style.scss';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className='title-section'>
          <h1 className="title">
            Welcome to Nice Gadgets store!
          </h1>
        </div>

        <MainSwiper />

        
      </main>

      {/* <Routes> */}
      {/* <Route path="/" element={<BurgerNavigation />} /> */}
      {/* </Routes> */}
      {/* <Outlet />
      <footer></footer> */}

      {/* <h1>Google Hi how are you??? </h1> */}
    </div>
  );
};
