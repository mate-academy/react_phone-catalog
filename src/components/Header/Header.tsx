import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { asset } from '../../utils/paths';
import { HeaderNavigation } from './HeaderNavigation/HeaderNavigation';
import { HeaderBurgerMenu } from './HeaderBurgerMenu/HeaderBurgerMenu';
import { HeaderActions } from './HeaderActions/HeaderActions';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  // console.log(asset('img/icons/Logo.svg'));

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <NavLink to="/" className={styles.logo}>
            <img
              src={asset('img/icons/Logo.svg')}
              alt="logo"
              className={styles.logoImg}
            />
          </NavLink>

          <HeaderNavigation />
        </div>

        <div className={styles.headerRight}>
          <HeaderActions favouritesCount={12} cartCount={5} />
        </div>

        <button
          type="button"
          className={`${styles.icon} ${styles.burgerButton}`}
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          <img
            src={asset(
              isMenuOpen ? 'img/icons/close.svg' : 'img/icons/menu-burger.svg',
            )}
            alt="menu"
          />
        </button>
      </header>

      {isMenuOpen && <HeaderBurgerMenu setIsMenuOpen={setIsMenuOpen} />}
    </>
  );
};
