import React, { useContext } from 'react';
import { IconType } from '../../utils/types';
import { HeaderIcon } from '../HeaderIcon';
import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../img/logo.png';
import logoDarkTheme from '../../img/night_theme_logo.png';
import { BASE_URL } from '../../utils/constants';

type Props = {
  closeMenu: () => void;
};

export const Menu: React.FC<Props> = ({ closeMenu }) => {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const { isDarkTheme } = useTheme();
  const cartQuantity = cart ? cart.length : null;
  const favoritesQuantity = favorites ? favorites.length : null;

  return (
    <aside className={styles.menu} id="menu">
      <div className={styles.menu__top}>
        <div className={styles['menu__top-bar']}>
          <Link to="/" className={styles.menu__logo} onClick={closeMenu}>
            <img src={isDarkTheme ? logoDarkTheme : logo} alt="page logo" />
          </Link>
          <button
            className={`${styles.menu__closeButton} ${isDarkTheme ? styles['menu__closeButton--dark'] : ''}`}
            onClick={closeMenu}
          ></button>
        </div>
        <nav className={styles.menu__nav}>
          <ul className={styles.menu__nav_list}>
            <li className={styles.menu__nav_item}>
              <Link
                className={styles.menu__nav_link}
                to={`${BASE_URL}/`}
                onClick={closeMenu}
              >
                home
              </Link>
            </li>
            <li className={styles.menu__nav_item}>
              <Link
                className={styles.menu__nav_link}
                to={`${BASE_URL}/phones`}
                onClick={closeMenu}
              >
                phones
              </Link>
            </li>
            <li className={styles.menu__nav_item}>
              <Link
                className={styles.menu__nav_link}
                to={`${BASE_URL}/tablets`}
                onClick={closeMenu}
              >
                tablets
              </Link>
            </li>
            <li className={styles.menu__nav_item}>
              <Link
                className={styles.menu__nav_link}
                to={`${BASE_URL}/accessories`}
                onClick={closeMenu}
              >
                accessories
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.menu__bottom}>
        <HeaderIcon
          type={IconType.favourites}
          size="wide"
          href="/favourites"
          onClick={closeMenu}
          number={favoritesQuantity}
        />
        <HeaderIcon
          type={IconType.cart}
          size="wide"
          href="/cart"
          onClick={closeMenu}
          number={cartQuantity}
        />
      </div>
    </aside>
  );
};
