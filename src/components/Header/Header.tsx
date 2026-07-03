import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import React from 'react';

type Props = {
  cartCount: number;
  favoritesCount: number;
};

export const Header: React.FC<Props> = ({ cartCount, favoritesCount }) => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="img/icons/logo-top.png" alt="Logo" />
      </Link>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Tablets
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link to="/favorites" className={styles.actionLink}>
            <div className={styles.iconContainer}>
              <img
                src="img/icons/favorite.png"
                alt="Favorites"
                className={styles.icon}
              />

              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
            </div>
          </Link>
          <Link to="/cart" className={styles.actionLink}>
            <div className={styles.iconContainer}>
              <img
                src="img/icons/cart.png"
                alt="Shopping Cart"
                className={styles.icon}
              />

              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
