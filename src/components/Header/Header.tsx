import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useFavorites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';

export const Header: React.FC = () => {
  const { favoriteIds } = useFavorites();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <NavLink to="/" className={styles.headerLogo} onClick={closeMenu}>
            <img src="/img/nice-gadgets-logo.png" alt="nice gadgets logo" />
          </NavLink>

          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Phones
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Tablets
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.headerActions}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `${styles.headerActionBtn} ${isActive ? styles.active : ''}`
              }
            >
              <img src="/img/favourites-logo.png" alt="favourites logo" />
              {favoriteIds.length > 0 && (
                <span className={styles.headerCount}>{favoriteIds.length}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.headerActionBtn} ${isActive ? styles.active : ''}`
              }
            >
              <img src="/img/shopping-bag.png" alt="shopping bag logo" />
              {totalCartItems > 0 && (
                <span className={styles.headerCount}>{totalCartItems}</span>
              )}
            </NavLink>
          </div>

          <button
            type="button"
            className={`${styles.burgerMenuBtn} ${isMenuOpen ? styles.burgerActive : ''}`}
            aria-label="Toggle menu"
            onClick={openMenu}
          ></button>
        </div>
      </header>

      <aside
        className={`${styles.asideMenu} ${isMenuOpen ? styles['asideMenu--open'] : ''}`}
        id="menu"
      >
        <div className={styles.asideMenu__top}>
          <NavLink to="/" className={styles.headerLogo} onClick={closeMenu}>
            <img src="/img/nice-gadgets-logo.png" alt="nice gadgets logo" />
          </NavLink>

          <button
            type="button"
            className={styles['asideMenu__close-btn']}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className={styles.asideMenu__content}>
          <nav className={styles.asideMenu__nav}>
            <ul className={styles.asideMenu__list}>
              <li className={styles.asideMenu__item}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${styles.asideMenu__link} ${isActive ? styles.active : ''}`
                  }
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className={styles.asideMenu__item}>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    `${styles.asideMenu__link} ${isActive ? styles.active : ''}`
                  }
                  onClick={closeMenu}
                >
                  Phones
                </NavLink>
              </li>
              <li className={styles.asideMenu__item}>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    `${styles.asideMenu__link} ${isActive ? styles.active : ''}`
                  }
                  onClick={closeMenu}
                >
                  Tablets
                </NavLink>
              </li>
              <li className={styles.asideMenu__item}>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    `${styles.asideMenu__link} ${isActive ? styles.active : ''}`
                  }
                  onClick={closeMenu}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles.asideMenu__footer}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `${styles.asideMenu__actionBtn} ${isActive ? styles.active : ''}`
              }
              onClick={closeMenu}
            >
              <img src="/img/favourites-logo.png" alt="favourites logo" />
              {favoriteIds.length > 0 && (
                <span className={styles.asideMenu__count}>
                  {favoriteIds.length}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.asideMenu__actionBtn} ${isActive ? styles.active : ''}`
              }
              onClick={closeMenu}
            >
              <img src="/img/shopping-bag.png" alt="shopping bag logo" />
              {totalCartItems > 0 && (
                <span className={styles.asideMenu__count}>
                  {totalCartItems}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </aside>

      {isMenuOpen && (
        <div className={styles.asideOverlay} onClick={closeMenu} />
      )}
    </>
  );
};
