import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';

import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pathname]);

  return (
    <div className="App">
      <h1 className="visually-hidden">Product Catalog</h1>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
