import { NavLink, Link } from 'react-router-dom';
import { IconType } from '../../utils/types';
import { HeaderIcon } from '../HeaderIcon';

import logo from '../../img/logo.png';
import logoDarkTheme from '../../img/night_theme_logo.png';
import styles from './Header.module.scss';
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { DarkThemeButton } from '../DarkThemeButton';
import classNames from 'classnames';

type Props = {
  onMenuClick: () => void;
  closeMenu: () => void;
};

export const Header: React.FC<Props> = ({ onMenuClick, closeMenu }) => {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const { isDarkTheme } = useTheme();
  const cartQuantity = cart ? cart.length : null;
  const favoritesQuantity = favorites ? favorites.length : null;
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
    let color;
    let borderBottom;

    if (isActive && isDarkTheme) {
      color = '#F1F2F9';
      borderBottom = '3px solid #F1F2F9';
    } else if (isActive && !isDarkTheme) {
      color = '#0F0F11';
      borderBottom = '3px solid #0F0F11';
    } else {
      color = '';
      borderBottom = '';
    }

    return {
      color,
      borderBottom,
    };
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <Link to="/" className={styles.header__logo}>
            <img src={isDarkTheme ? logoDarkTheme : logo} alt="page logo" />
          </Link>
          <nav className={styles.header__nav}>
            <ul className={styles.header__nav_list}>
              <li className={styles.header__nav_item}>
                <NavLink
                  to="/"
                  className={styles.header__nav_link}
                  style={getLinkStyle}
                >
                  home
                </NavLink>
              </li>
              <li className={styles.header__nav_item}>
                <NavLink
                  to="/phones"
                  className={styles.header__nav_link}
                  style={getLinkStyle}
                >
                  phones
                </NavLink>
              </li>
              <li className={styles.header__nav_item}>
                <NavLink
                  to="/tablets"
                  className={styles.header__nav_link}
                  style={getLinkStyle}
                >
                  tablets
                </NavLink>
              </li>
              <li className={styles.header__nav_item}>
                <NavLink
                  to="/accessories"
                  className={styles.header__nav_link}
                  style={getLinkStyle}
                >
                  accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.header__right}>
          <DarkThemeButton />

          <HeaderIcon
            type={IconType.favourites}
            href="/favourites"
            onClick={closeMenu}
            number={favoritesQuantity}
          />
          <HeaderIcon
            type={IconType.cart}
            href="/cart"
            onClick={closeMenu}
            number={cartQuantity}
          />
        </div>
      </header>
      <header className={`${styles.header} ${styles['header--mobile']}`}>
        <Link to="/" className={styles.header__logo}>
          <img src={isDarkTheme ? logoDarkTheme : logo} alt="page logo" />
        </Link>
        <div className={styles.header__right}>
          <DarkThemeButton />
          <button
            className={classNames(styles.header__menuButton, {
              [styles['header__menuButton--dark']]: isDarkTheme,
            })}
            onClick={onMenuClick}
          ></button>
        </div>
      </header>
    </>
  );
};
