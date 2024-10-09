import React, { useState } from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { BurgerMenu } from './components/BurgerMenu';
import { Footer } from './components/Footer/Footer';
import { useAppContext } from './ContextStor';

export const App = () => {
  const { favorites, cart } = useAppContext();

  const [burgerMenu, setBurgerMenu] = useState(false);

  return (
    <div className="App">
      <Header
        favorites={favorites}
        cart={cart}
        burgerMenu={burgerMenu}
        setBurgerMenu={setBurgerMenu}
      />

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
