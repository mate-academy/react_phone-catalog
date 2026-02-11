import { Outlet, useLocation } from 'react-router-dom';
import '../src/styles/main.scss';
import './App.scss';
import { Footer } from './modules/shared/Footer';
import { Header } from './modules/shared/Header';
import { useEffect } from 'react';
import { Menu } from './modules/shared/Menu';

export const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <div className="App">
      <header className="App__header">
        <Header />
      </header>

      <div className="App__menu">
        <Menu />
      </div>

      <main className="App__content">
        <Outlet />
      </main>

      <footer className="App__footer">
        <Footer />
      </footer>
    </div>
  );
};
