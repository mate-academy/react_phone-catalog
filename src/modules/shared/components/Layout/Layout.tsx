import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Menu } from '../Header/components/Menu';
import { useEffect, useState } from 'react';
import styles from './Layout.module.scss';

const MIN_TABLET_SCREEN_SIZE = 640;

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This allows you to close the navigation menu if the screen width
  // accidentally becomes equal to or greater than the tablet's screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MIN_TABLET_SCREEN_SIZE) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <div className={styles.layoutContainer}>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className={styles.mainContainer}>
        {isMenuOpen ? (
          <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        ) : (
          <Outlet />
        )}
      </main>
      {!isMenuOpen && <Footer />}
    </div>
  );
};
