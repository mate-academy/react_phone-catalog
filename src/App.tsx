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
        <h1 className="h1">Welcome to Nice Gadgets store!</h1>
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
