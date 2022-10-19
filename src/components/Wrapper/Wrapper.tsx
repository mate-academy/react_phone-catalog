import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const Wrapper: React.FC = () => (
  <div className="wrapper">
    <Header />
    <main className="page__main">
      <div className="container">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);
