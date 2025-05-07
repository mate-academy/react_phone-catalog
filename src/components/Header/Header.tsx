/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import { ShoppingCart } from '../ShoppingCart';
import { Favourites } from '../Favourites';
import { ThemeToggler } from '../ThemeToggler';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import styles from './Header.module.scss';
import menu from '../../images/icons/menu_burger.svg';
import menu_dark from '../../images/icons/menu_for_dark.svg';
import close from '../../images/icons/close.svg';
import close_dark from '../../images/icons/close_for_dark.svg';

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
      className={cn({
        [styles.header]: theme === Theme.Light,
        [styles['header--dark']]: theme === Theme.Dark,
      })}
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
              className={cn({
                [styles['header__menu-btn']]: theme === Theme.Light,
                [styles['header__menu-btn-dark']]: theme === Theme.Dark,
              })}
              onClick={handleCloseMenu}
            >
              <img
                src={theme === Theme.Light ? close : close_dark}
                alt="cross"
                className={styles.header__image}
              />
            </button>
          ) : (
            <button
              className={cn({
                [styles['header__menu-btn']]: theme === Theme.Light,
                [styles['header__menu-btn-dark']]: theme === Theme.Dark,
              })}
              onClick={handleOpenMenu}
            >
              <img
                src={theme === Theme.Light ? menu : menu_dark}
                alt="burger"
                className={styles.header__image}
              />
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
