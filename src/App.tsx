import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { useEffect } from 'react';
import { Footer } from './components/Footer';

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
