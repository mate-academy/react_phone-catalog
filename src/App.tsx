import React, { memo, useEffect } from 'react';
import './styles/index.scss';
import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { useAppLocation } from './enhancers/hooks/appLocation';

export const App: React.FC = memo(() => {
  const location = useAppLocation();

  useEffect(() => {
    const scrollToTop = location.state?.scrollToTop;

    if (scrollToTop !== false) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search, location.state]);

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
