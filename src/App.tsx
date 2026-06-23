import { Outlet } from 'react-router-dom';
import styles from './styles/index.module.scss';
import { Footer } from './modules/Footer';
import React from 'react';
import { useMyContext } from './Context/ProductContexts';

export const App: React.FC = () => {
  const { isMenuOpen } = useMyContext();

  return (
    <div className={styles.app}>
      <title>best app</title>
      <h1 className={styles.sr_only}>Product Catalog</h1>

      <main className={styles.content}>
        <Outlet />
      </main>
      {!isMenuOpen && <Footer />}
    </div>
  );
};
