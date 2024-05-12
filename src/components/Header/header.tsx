import React, { useEffect, useState } from 'react';
import styles from './header.module.scss';
import catalogLogo from './Pictures/header-logo.png';
import menuLogo from './Pictures/burger-menu.png';
import FavoritesHeard from './Pictures/Favourites (Heart Like).png';
import FavoritesDark from './Pictures/favoritesDark.png';
import shops from './Pictures/Shopping bag (Cart).png';
import shopsDark from './Pictures/shopDark.png';
import close from './Pictures/Close.png';
import { Navigation } from '../Navigation/Navigation';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { toggleTheme } from '../../feachers/themeModeSlice';
import { Theme } from '../../services/theme';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return [styles.navigation__links, isActive ? styles.isActive : ''].join(' ');
};

export const Header: React.FC = () => {
  const theme = useAppSelector(state => state.theme.theme);

  const [iconClose, setIconClose] = useState(false);
  // const [usedTheme, setUsedTheme] = useState(theme);

  const items = useAppSelector(state => state.cartAndFavorits.favorites);
  const cart = useAppSelector(state => state.cartAndFavorits.cart);

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

  return (
    <>
      <section className={styles.headerContainer}>
        <header className={Theme.light ? styles.header : styles.headerdarkMode}>
          <NavLink to={'/'}>
            <img
              className={styles.headerLogo}
              src={catalogLogo}
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
                  !theme ? styles.headerButtons : styles.headerButtonsdarkMode
                }
              >
                {items.length > 0 && (
                  <div className={styles.favoriteCounts}>{items.length}</div>
                )}
                <img
                  className={styles.headerButtonIcon}
                  src={!theme ? FavoritesHeard : FavoritesDark}
                  alt="Favorites"
                />
              </div>
            </NavLink>
            <NavLink to={'/cart'} className={getLinkClass}>
              <div
                className={
                  !theme ? styles.headerButtons : styles.headerButtonsdarkMode
                }
              >
                {cart.length > 0 && (
                  <div className={styles.favoriteCounts}>{cart.length}</div>
                )}
                <img
                  className={styles.headerButtonIcon}
                  src={!theme ? shops : shopsDark}
                  alt="Shopping"
                />
              </div>
            </NavLink>
            <NavLink to={'/menu'} className={styles.headerButtonsMenu}>
              <div className={styles.headerButtonsMenu} onClick={handlerMenu}>
                {!iconClose ? (
                  <img
                    className={styles.headerButtonMenuIcon}
                    src={menuLogo}
                    alt="Menu"
                  />
                ) : (
                  <img
                    className={styles.headerButtonMenuIcon}
                    src={close}
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
