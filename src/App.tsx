import React from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Menu } from './components/Menu';
import { MenuProvider } from './hooks/useMenu';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="app">
      <MenuProvider>
        <div className="app__header">
          <Header />
        </div>
        <Menu />
      </MenuProvider>
      <div className="app__main">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
