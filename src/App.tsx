import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <Header />
      <main className="App__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
