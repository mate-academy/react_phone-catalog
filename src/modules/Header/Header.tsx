import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/images/logo.svg';
import { useEffect, useState } from 'react';
import { Menu } from './components/Menu';
import { Navigation } from './components/Navigation';
import { Actions } from './components/Actions';
import { MainNavigation } from '../../utils/constants';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className={styles.header}>
        <NavLink
          className={styles['header__link-logo']}
          to={MainNavigation.HOME}
        >
          <img className={styles.header__logo} src={logo} alt="logo" />
        </NavLink>
        <button
          className={`${styles['header__menu-btn']} ${
            isMenuOpen
              ? styles['header__menu-btn--open']
              : styles['header__menu-btn--close']
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="toggle menu"
        />
        <div className={styles['header__nav-bar']}>
          <Navigation />

          <Actions className={styles.header__actions} />
        </div>
      </header>

      {isMenuOpen && <Menu className={styles.header__menu} />}
    </>
  );
};
