import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { Header } from '../shared/Header';
import { Menu } from '../shared/Menu';
import { Footer } from '../shared/Footer';
import '/src/styles/main.scss';
import './Layout.scss';

export const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="Layout">
      <header className="Layout__header">
        <Header />
      </header>

      <div className="Layout__menu">
        <Menu />
      </div>

      <main className="Layout__content">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="Layout__footer">
        <Footer />
      </footer>
    </div>
  );
};
