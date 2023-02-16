import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../1_Header/Header';
import { Footer } from '../9_Footer/Footer';

import './layout.scss';

export const Layout: React.FC = () => {
  return (
    <div className="Layout">
      <Header />

      <div className="layout__container">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
