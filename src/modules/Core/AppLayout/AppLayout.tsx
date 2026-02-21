import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './AppLayout.module.scss';

export const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.content}>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
