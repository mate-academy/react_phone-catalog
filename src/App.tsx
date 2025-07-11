import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.scss';

import { Header } from './components/Header';
import './components/Header/style.scss';

export const App = () => {
  return (
    <div className="App">
      <Header />
      
      {/* <Routes> */}
        {/* <Route path="/" element={<BurgerNavigation />} /> */}
      {/* </Routes> */}
      {/* <Outlet />
      <footer></footer> */}

      {/* <h1>Google Hi how are you??? </h1> */}
    </div>
  );
};
