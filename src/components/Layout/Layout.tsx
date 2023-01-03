import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const Layout: React.FC = () => {
  return (
    <>
      <Header />

      <main className="page">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
};
