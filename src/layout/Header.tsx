import React, { forwardRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { logo, favouritesIcon, shoppingBagIcon } from '../assets/icons';
import '../App.scss';
import classNames from 'classnames';
import { useFavorites } from '../context/FavoritesContext/FavoritesContext';
import { useCart } from '../context/CartContext/CartContext';
import styles from './Header.module.scss';
import { useTheme } from '../context/ThemeContext/ThemeContext';
import ofButton from '../../public/img/icons/SwitchLeft.svg';
import switchIcon from '../../public/img/icons/onButton.png';

interface HeaderProps {}
export const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
  const { totalQuantity } = useCart();
  const { totalFavorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const selectedPage = (isActive: boolean) =>
    classNames(styles.header__navLink, { [styles.active]: isActive });

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isIconFixed, setIsIconFixed] = useState<boolean>(false);

  const toggleBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsIconFixed(!isIconFixed);
  };

  const closedMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header ref={ref} className={styles.header}>
      <div className={styles.header__logo}>
        <NavLink to="/" className={styles.header__logoLink}>
          <img src={logo} alt="Logo" className={styles.header__logoLogo} />
        </NavLink>

        <nav
          className={`${styles.header__navList} ${isMenuOpen ? styles.open : ''}`}
        >
          <ul>
            <li>
              <NavLink
                onClick={closedMenu}
                to="/"
                className={({ isActive }) => selectedPage(isActive)}
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closedMenu}
                to="/phones"
                className={({ isActive }) => selectedPage(isActive)}
              >
                PHONES
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closedMenu}
                to="/tablets"
                className={({ isActive }) => selectedPage(isActive)}
              >
                TABLETS
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closedMenu}
                to="/accessories"
                className={({ isActive }) => selectedPage(isActive)}
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.switchIcon}>
        <img
          src={theme === 'light' ? switchIcon : ofButton}
          alt="Switch theme"
          onClick={toggleTheme}
          className={styles.iconSwitch}
        />
      </div>

      <div
        className={`${styles.header__icons} ${isMenuOpen ? styles.fixed : ''}`}
      >
        <div className={styles.iconFavourites__container}>
          <NavLink
            onClick={closedMenu}
            to="/favourites"
            className={`${styles.header__icon} ${styles.header__iconFavourites}`}
          >
            <img src={favouritesIcon} alt="Favourites" />
            {totalFavorites > 0 && (
              <span className={styles.totalFavorites}>{totalFavorites}</span>
            )}
          </NavLink>
        </div>

        <div className={styles.iconBag__container}>
          <NavLink
            onClick={closedMenu}
            to="/cart"
            className={`${styles.header__icon} ${styles.header__iconBag}`}
          >
            <img src={shoppingBagIcon} alt="Shopping Bag" />
            {totalQuantity > 0 && (
              <span className={styles.totalQuantity}>{totalQuantity}</span>
            )}
          </NavLink>
        </div>
      </div>

      <button
        className={`${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`}
        onClick={toggleBurgerMenu}
      >
        <span className={isMenuOpen ? styles.cross : ''}></span>
        <span className={isMenuOpen ? styles.cross : ''}></span>
        <span className={isMenuOpen ? styles.cross : ''}></span>
      </button>
    </header>
  );
});
