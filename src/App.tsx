import React, { useEffect } from 'react';
import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BreadCrumbs } from './components/BreadCrumbs';

export const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  const isVisible = pathname
    .split('/')
    .filter(item => item !== '')
    .some(item => item !== 'cart');

  return (
    <div className="App">
      <header className="header">
        <Navbar />

        {isVisible && (
          <div className="container">
            <BreadCrumbs />
          </div>
        )}
      </header>

      <div className="container main">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
