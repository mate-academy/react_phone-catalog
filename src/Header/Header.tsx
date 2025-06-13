import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('body_no_scroll');
    } else {
      document.body.classList.remove('body_no_scroll');
    }
  });

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

      setCartCount(cart.length);
      setFavoritesCount(favorites.length);
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);

    window.addEventListener('cartOrFavoritesChanged', updateCounts);

    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cartOrFavoritesChanged', updateCounts);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="img/Logo.svg" alt="Logo" className={styles.logo_img} />
          </Link>
        </div>

        <div className={styles.burger} onClick={toggleMenu}>
          {menuOpen ? (
            <img
              src="img/close.png"
              alt="Burger close"
              className={styles.burger_img}
            />
          ) : (
            <img
              src="img/burger-menu.png"
              alt="Burger menu"
              className={styles.burger_img}
            />
          )}
        </div>

        <nav className={`${styles.nav} ${menuOpen ? styles.nav_open : ''}`}>
          <ul className={styles.nav_left}>
            <li>
              <NavLink
                to="/"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active_link : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active_link : ''}`
                }
              >
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active_link : ''}`
                }
              >
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active_link : ''}`
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>

          <div className={styles.nav_right}>
            <NavLink
              to="/Favorites"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `${styles.nav_favorite} ${isActive ? styles.active_link : ''}`
              }
            >
              <img
                src="img/Favourites.svg"
                alt="Favorites"
                className={styles.nav_img}
              />
              {favoritesCount > 0 && (
                <div className={styles.items_count}>{favoritesCount}</div>
              )}
            </NavLink>
            <NavLink
              to="/Cart"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `${styles.nav_cart} ${isActive ? styles.active_link : ''}`
              }
            >
              <img
                src="img/shopping-bag.svg"
                alt="Cart"
                className={styles.nav_img}
              />
              {cartCount > 0 && (
                <div className={styles.items_count}>{cartCount}</div>
              )}
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};
