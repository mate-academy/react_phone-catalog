import React, { useState, useContext } from 'react'; // Додали useContext
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { BurgerMenu } from '../BurgerMenu';

import { CartContext } from '../../modules/shared/context/CartContext';
// eslint-disable-next-line max-len
import { FavoritesContext } from '../../modules/shared/context/FavoritesContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const cartContext = useContext(CartContext);
  const favoritesContext = useContext(FavoritesContext);

  const favoritesCount = favoritesContext?.favorites.length || 0;

  const cartCount =
    cartContext?.cart.reduce((total, item) => total + item.quantity, 0) || 0;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.header__navLink} ${styles['header__navLink--active']}`
      : styles.header__navLink;

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          <img
            src="/icons/logo.svg"
            alt="NICE GADGETS"
            width="120"
            height="40"
          />
        </Link>

        <nav className={styles.header__nav}>
          <ul className={styles.header__navList}>
            <li className={styles.header__navItem}>
              <NavLink to="/" className={getLinkClass}>
                HOME
              </NavLink>
            </li>
            <li className={styles.header__navItem}>
              <NavLink to="/phones" className={getLinkClass}>
                PHONES
              </NavLink>
            </li>
            <li className={styles.header__navItem}>
              <NavLink to="/tablets" className={getLinkClass}>
                TABLETS
              </NavLink>
            </li>
            <li className={styles.header__navItem}>
              <NavLink to="/accessories" className={getLinkClass}>
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.header__actions}>
          <div className={styles.header__icons}>
            <Link to="/favorites" className={styles.header__iconBtn}>
              <img
                src="/icons/heart-empty.svg"
                alt="Favorites"
                width="16"
                height="16"
              />

              {favoritesCount > 0 && (
                <span className={styles.header__badge}>{favoritesCount}</span>
              )}
            </Link>

            <Link to="/cart" className={styles.header__iconBtn}>
              <img src="/icons/cart.svg" alt="Cart" width="16" height="16" />

              {cartCount > 0 && (
                <span className={styles.header__badge}>{cartCount}</span>
              )}
            </Link>
          </div>

          <button
            className={styles.header__menuBtn}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
            aria-expanded={isMenuOpen}
          >
            <img src="/icons/menu.svg" alt="Меню" width="16" height="16" />
          </button>
        </div>
      </div>

      <BurgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
    </header>
  );
};
