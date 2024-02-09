import React, { memo, useEffect } from 'react';
import './styles/index.scss';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

export const App: React.FC = memo(() => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return (
    <div className="App">
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
});
