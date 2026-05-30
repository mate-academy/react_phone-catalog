import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header, Footer } from './components';

import styles from './App.module.scss';

export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
