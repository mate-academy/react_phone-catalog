/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import { ShoppingCart } from '../ShoppingCart';
import { Favourites } from '../Favourites';

import styles from './Header.module.scss';
import menu from '../../images/icons/menu_burger.svg';
import close from '../../images/icons/close.svg';
import { ThemeToggler } from '../ThemeToggler';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [openMenu]);

  useEffect(() => {
    if (pathname !== '/menu' && openMenu) {
      setOpenMenu(false);
      document.body.style.overflow = '';
    }
  }, [pathname, openMenu]);

  const handleOpenMenu = () => {
    setOpenMenu(true);
    navigate('/menu');
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    navigate('/');
  };

  return (
    <nav
      className={theme === Theme.Light ? styles.header : styles['header--dark']}
    >
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Logo className={styles.header__logo} />
          <Navbar className={styles.header__navbar} />
        </div>

        <div className={styles.header__right}>
          <ThemeToggler className={styles.header__toggler} />
          {openMenu ? (
            <button
              className={styles['header__menu-btn']}
              onClick={handleCloseMenu}
            >
              <img src={close} className={styles.header__image} />
            </button>
          ) : (
            <button
              className={
                theme === Theme.Light
                  ? styles['header__menu-btn']
                  : styles['header__menu-btn--dark']
              }
              onClick={handleOpenMenu}
            >
              <img src={menu} className={styles.header__image} />
            </button>
          )}

          {!openMenu && (
            <>
              <Favourites className={styles.header__favourites} />
              <ShoppingCart className={styles.header__cart} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
