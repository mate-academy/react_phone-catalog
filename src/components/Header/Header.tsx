import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { asset } from '../../utils/paths';
import { HeaderNavigation } from './HeaderNavigation/HeaderNavigation';
import { HeaderBurgerMenu } from './HeaderBurgerMenu/HeaderBurgerMenu';
import { HeaderActions } from './HeaderActions/HeaderActions';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <NavLink to="/" className={styles.logo}>
            <img
              src={asset('/img/icons/Logo.svg')}
              // src={'/img/icons/Logo.svg'}
              alt="logo"
              className={styles.logoImg}
            />
          </NavLink>

          <HeaderNavigation />
        </div>

        <div className={styles.headerRight}>
          <HeaderActions />
        </div>

        <button
          type="button"
          className={`${styles.icon} ${styles.burgerButton}`}
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          <img
            src={asset(
              isMenuOpen
                ? '/img/icons/close.svg'
                : '/img/icons/menu-burger.svg',
            )}
            // src={
            //   isMenuOpen ? '/img/icons/close.svg' : '/img/icons/menu-burger.svg'
            // }
            alt="menu"
          />
        </button>
      </header>

      {isMenuOpen && <HeaderBurgerMenu />}
    </>
  );
};
