import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import icon from './../img/icons/Logo.svg';
import likeDefault from './../img/icons/like.svg';
import shoppingBagIcon from './../img/icons/Shopping-bag.svg';
import menu from './../img/icons/Menu.svg';
import close from './../img/icons/Close.svg';

import styles from './Header.module.scss';
import { useCart } from '../CartContext';
import { useFavorites } from '../FavoriteContext';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Phones', to: '/phones' },
  { label: 'Tablets', to: '/tablets' },
  { label: 'Accessories', to: '/accessories' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { items } = useCart();
  const { favorites } = useFavorites();

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavorites = favorites.length;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          {/* Desktop navigation */}
          <ul className={styles.headerList}>
            <img src={icon} alt="logo" className={styles.headerImg} />
            {links.map(l => (
              <li key={l.label}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.headerLink} ${styles.active}`
                      : styles.headerLink
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop icons */}
          <div className={styles.headerIcons}>
            <NavLink
              to="/favorites"
              className={`${styles.headerIconSize} ${location.pathname === '/favorites' ? styles.iconActive : ''
                }`}
            >
              <img src={likeDefault} alt="favorites" />
              {totalFavorites > 0 && (
                <span className={styles.cartBadge}>{totalFavorites}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={`${styles.headerIconSize} ${location.pathname === '/cart' ? styles.iconActive : ''
                }`}
            >
              <img src={shoppingBagIcon} alt="cart" />
              {totalCount > 0 && (
                <span className={styles.cartBadge}>{totalCount}</span>
              )}
            </NavLink>
          </div>

          {/* Burger */}
          <button
            className={styles.burger}
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            <img src={isMenuOpen ? close : menu} alt="menu" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <>
          <nav className={styles.mobileMenu}>
            <div className={styles.mobileHeader}>
              <img src={icon} alt="logo" className={styles.mobileLogoImg} />
              <button
                className={styles.mobileCloseBtn}
                onClick={() => setIsMenuOpen(false)}
              >
                <img src={close} alt="close" />
              </button>
            </div>

            <ul className={styles.mobileList}>
              {links.map(l => (
                <li key={l.label}>
                  <NavLink
                    to={l.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? styles.mobileActive : styles.mobileLink
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className={styles.mobileBottom}>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? styles.bottomActive : styles.bottomLink
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <img src={likeDefault} alt="favorites" />
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? styles.bottomActive : styles.bottomLink
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <img src={shoppingBagIcon} alt="cart" />
              </NavLink>
            </div>
          </nav>
        </>
      )}
    </>
  );
};
