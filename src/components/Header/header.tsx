/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import styles from './header.module.scss';
import catalogLogo from './Pictures/header-logo.png';
import catalogLogoDark from './Pictures/logoNiceDark.png';
import menuLogo from './Pictures/burger-menu.png';
import menuLogoDark from './Pictures/Menu.png';
import FavoritesHeard from './Pictures/Favourites (Heart Like).png';
import FavoritesDark from './Pictures/favoritesDark.png';
import shops from './Pictures/Shopping bag (Cart).png';
import shopsDark from './Pictures/shopDark.png';
import close from './Pictures/Close.png';
import closeDark from './Pictures/closeDark.png';
import { Navigation } from '../Navigation/Navigation';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { toggleTheme } from '../../Reducers/themeModeSlice';
import { Theme } from '../../Helpers/theme';

export const Header: React.FC = () => {
  const theme = useAppSelector(state => state.theme.theme);
  const items = useAppSelector(state => state.cartAndFavorits.favorites);
  const cart = useAppSelector(state => state.cartAndFavorits.cart);

  const [iconClose, setIconClose] = useState(false);

  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/menu') {
      setIconClose(true);
    } else {
      setIconClose(false);
    }
  }, [location]);

  const handlerMenu = () => {
    setIconClose(prev => !prev);
    if (iconClose) {
      navigate(-1);
    }
  };

  const handleThemeModeToggle = () => {
    if (theme === Theme.light) {
      dispatch(toggleTheme(Theme.dark));

      return;
    }

    dispatch(toggleTheme(Theme.light));
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return [
      styles.navigation__links,
      isActive
        ? theme === Theme.light
          ? styles.isActive
          : styles.headerButtonIconDark__isActive
        : '',
    ].join(' ');
  };

  return (
    <>
      <section className={styles.headerContainer}>
        <header
          className={
            theme === Theme.light ? styles.header : styles.headerdarkMode
          }
        >
          <NavLink className={styles.logoNav} to={'/'}>
            <img
              className={styles.headerLogo}
              src={theme === Theme.light ? catalogLogo : catalogLogoDark}
              alt="Catalog Logo"
            />
          </NavLink>

          <Navigation />
          <div className={styles.darkModeContainer}>
            <DarkModeSwitch
              checked={theme === Theme.dark}
              onChange={handleThemeModeToggle}
              size={25}
            />
          </div>

          <div className={styles.buttonsContainer}>
            <NavLink to={'/favorites'} className={getLinkClass}>
              <div
                className={
                  theme === Theme.light
                    ? styles.headerButtons
                    : styles.headerButtonsdarkMode
                }
              >
                {items.length > 0 && (
                  <div
                    className={
                      theme === Theme.light
                        ? styles.favoriteCounts
                        : styles.favoriteCountsdarkMode
                    }
                  >
                    {items.length}
                  </div>
                )}
                <img
                  className={
                    theme === Theme.light
                      ? styles.headerButtonIcon
                      : styles.headerButtonIconDark
                  }
                  src={theme === Theme.light ? FavoritesHeard : FavoritesDark}
                  alt="Favorites"
                />
              </div>
            </NavLink>
            <NavLink to={'/cart'} className={getLinkClass}>
              <div
                className={
                  theme === Theme.light
                    ? styles.headerButtons
                    : styles.headerButtonsdarkMode
                }
              >
                {cart.length > 0 && (
                  <div
                    className={
                      theme === Theme.light
                        ? styles.favoriteCounts
                        : styles.favoriteCountsdarkMode
                    }
                  >
                    {cart.length}
                  </div>
                )}
                <img
                  className={styles.headerButtonIcon}
                  src={theme === Theme.light ? shops : shopsDark}
                  alt="Shopping"
                />
              </div>
            </NavLink>
            <NavLink to={'/menu'} className={styles.headerButtonsMenu}>
              <div
                className={
                  theme === Theme.light
                    ? styles.headerButtonsMenu
                    : styles.headerButtonsMenudarkMode
                }
                onClick={handlerMenu}
              >
                {!iconClose ? (
                  <img
                    className={styles.headerButtonMenuIcon}
                    src={theme === Theme.light ? menuLogo : menuLogoDark}
                    alt="Menu"
                  />
                ) : (
                  <img
                    className={styles.headerButtonMenuIcon}
                    src={theme === Theme.light ? close : closeDark}
                    alt="Close"
                  />
                )}
              </div>
            </NavLink>
          </div>
        </header>
      </section>
    </>
  );
};
