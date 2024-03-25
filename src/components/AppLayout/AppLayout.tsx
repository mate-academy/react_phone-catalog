import { Outlet } from 'react-router-dom';
import React from 'react';

import { Header } from './Header';
import { Footer } from './Footer';

import style from './AppLayout.module.scss';

export const AppLayout: React.FC = () => (
  <>
    <Header />
    <div className={style.outlet}>
      <Outlet />
    </div>
    <Footer />
  </>
);
