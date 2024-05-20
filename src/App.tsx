import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './App.module.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.app}>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div
        className={classNames(styles.container, {
          [styles.containerHidden]: isMenuOpen,
        })}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
