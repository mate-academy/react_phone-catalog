import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './Layout.module.scss';

export const Layout = ({ theme, toggleTheme }) => {
  return (
    <div className={styles.layout}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer theme={theme} />
    </div>
  );
};
