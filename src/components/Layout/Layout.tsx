import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import styles from './Layout.module.scss';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { ScroollToTop } from '../ScroollToTop/ScroollToTop';
interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <ScroollToTop />
      <Header />

      <BurgerMenu />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
};
