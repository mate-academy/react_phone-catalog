import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import './Layout.scss';

export const Layout = () => {
  return (
    <div className="layout">
      <header className="layout__header">
        <Header />
      </header>

      <main className="layout__main">
        <Suspense>
          <Outlet />
        </Suspense>
      </main>

      <footer className="layout__footer">
        <Footer />
      </footer>
    </div>
  );
};
