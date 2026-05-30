import React from 'react';
import styles from './Layout.module.scss';
import { NavBar } from '../NavBar';
import { Footer } from '../Footer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={styles.layout}>
      <NavBar />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
};
