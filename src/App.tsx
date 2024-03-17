import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GlobalContext } from './GlobalContext';
import './App.scss';
import { Menu } from './components/Menu';

export const App: React.FC = () => {
  const { isBurgerMenu } = useContext(GlobalContext);

  return (
    <div className="app">
      <Header />

      {isBurgerMenu && (
        <Menu />
      )}

      {!isBurgerMenu && (
        <>
          <div className="main-content">
            <div className="main-content__container">
              <Outlet />
            </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
};
