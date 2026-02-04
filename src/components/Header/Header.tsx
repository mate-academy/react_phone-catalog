import Menu from '../Menu/index';
import MainMenu from '../MainMenu/index';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === 'Escape' || e.key === 'Esc') && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <Logo />
          <div className={styles.topBar__menu}>
            <Menu />
          </div>

          <div className={styles.topBar__icons}>
            <div className={styles.icon__background}>
              <Link
                to="/favourites"
                className={`${styles.icon} ${styles['icon--favourites']}`}
              ></Link>
            </div>
            <div className={styles.icon__background}>
              <Link
                to="#shopping-bag-cart"
                className={`${styles.icon} ${styles['icon--shopping-bag-cart']}`}
              ></Link>
              <div className={styles.icon__background}>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(prev => !prev)}
                  className={`${styles.icon} ${styles['icon--menu']}`}
                  aria-expanded={isMenuOpen}
                  aria-controls="main-menu"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MainMenu isMenuOpen={isMenuOpen} onClose={handleCloseMenu} />
    </>
  );
};
