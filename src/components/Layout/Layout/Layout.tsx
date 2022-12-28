import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../Header';
import { Footer } from '../../Footer';

export const Layout: React.FC = () => {
  return (
    <>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
