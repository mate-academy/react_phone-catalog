import { useState } from 'react';
import classNames from 'classnames';
import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

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
