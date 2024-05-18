import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';
import { BreadCrumbs } from './components/BreadCrumbs';
import { useEffect } from 'react';

export const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isCartPage = location.pathname === '/cart';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      <Header />
      <main className="AppWidth">
        {!isHomePage && !isCartPage && <BreadCrumbs />}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
