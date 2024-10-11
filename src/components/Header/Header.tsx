import { NavLink, Link } from 'react-router-dom';
import { IconType } from '../../utils/types';
import { HeaderIcon } from '../HeaderIcon';

import logo from '../../img/logo.png';
import styles from './Header.module.scss';
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';

type Props = {
  onMenuClick: () => void;
  closeMenu: () => void;
};

export const Header: React.FC<Props> = ({ onMenuClick, closeMenu }) => {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const cartQuantity = cart ? cart.length : null;
  const favoritesQuantity = favorites ? favorites.length : null;
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return {
      color: isActive ? '#0f0f11' : '',
      borderBottom: isActive ? '3px solid #0f0f11' : '',
    };
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <Link to="/" className={styles.header__logo}>
            <img src={logo} alt="page logo" />
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
          <img src={logo} alt="page logo" />
        </Link>
        <button
          className={styles.header__menuButton}
          onClick={onMenuClick}
        ></button>
      </header>
    </>
  );
};
