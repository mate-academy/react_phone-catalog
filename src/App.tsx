import { useState } from 'react';
import styles from './App.module.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenMenu = () => setIsOpen(current => !current);

  return (
    <div className={styles.app}>
      <Header isOpen={isOpen} toggleOpenMenu={toggleOpenMenu} />
      <div className={styles.container}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
