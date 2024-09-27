import React, { useState } from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { BurgerMenu } from './components/BurgerMenu';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  const [burgerMenu, setBurgerMenu] = useState(false);

  return (
    <div className="App">
      <Header burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} />

      {burgerMenu ? (
        <BurgerMenu burgerMenu={burgerMenu} setBurgerMenu={setBurgerMenu} />
      ) : (
        <>
          <div className="container">
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};
