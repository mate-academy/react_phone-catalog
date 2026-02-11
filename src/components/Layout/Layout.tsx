import React from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './Layout.module.scss';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
  </div>
);
