import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './Layout.module.scss';

interface LayoutProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ theme, toggleTheme }) => {
  return (
    <div className={styles.layout} data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className={styles.main}>
        <Outlet context={{ theme }} />
      </main>
      <Footer theme={theme} />
    </div>
  );
};
