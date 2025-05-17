import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import { useState } from 'react';

export const Layout = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Header className={styles.header} onBurgerToggle={setIsBurgerOpen} />
      <main className={styles.content}>
        <Outlet />
      </main>
      {!isBurgerOpen && <Footer className={styles.footer} />}
    </div>
  );
};
