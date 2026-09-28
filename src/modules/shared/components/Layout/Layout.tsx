import React from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export const Layout: React.FC = () => (
  <>
    <ScrollToTop />
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);
