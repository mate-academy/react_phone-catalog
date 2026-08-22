import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../../../contexts/CartContext';
import { useFavorites } from '../../../../contexts/FavoritesContext';
import { Icon } from '../Icon';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Header = () => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__inner}`}>
        <div className={styles.header__left}>
          <NavLink to="/" className={styles.header__logo}>
            NICE
            <span aria-hidden="true">👌</span>
            <br />
            GADGETS
          </NavLink>

          <nav className={styles.header__nav}>
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${styles.header__link} ${
                    isActive ? styles['header__link--active'] : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.header__right}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.header__iconLink} ${
                isActive ? styles['header__iconLink--active'] : ''
              }`
            }
            aria-label="Favorites"
          >
            <Icon name="heart" />
            {favorites.length > 0 && (
              <span className={styles.header__badge}>{favorites.length}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.header__iconLink} ${
                isActive ? styles['header__iconLink--active'] : ''
              }`
            }
            aria-label="Cart"
          >
            <Icon name="cart" />
            {totalQuantity > 0 && (
              <span className={styles.header__badge}>{totalQuantity}</span>
            )}
          </NavLink>

          <button
            type="button"
            className={styles.header__menuButton}
            aria-label="Menu"
            onClick={() => setMenuOpen(open => !open)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.header__mobileOverlay}>
          <div className={`container ${styles.header__mobileTop}`}>
            <NavLink to="/" className={styles.header__logo}>
              NICE
              <span aria-hidden="true">👌</span>
              <br />
              GADGETS
            </NavLink>

            <button
              type="button"
              className={styles.header__menuButton}
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <Icon name="close" />
            </button>
          </div>

          <nav className={styles.header__mobileNav}>
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${styles.header__mobileLink} ${
                    isActive ? styles['header__mobileLink--active'] : ''
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.header__mobileBottom}>
            <NavLink
              to="/favorites"
              className={styles.header__mobileIconLink}
              onClick={() => setMenuOpen(false)}
              aria-label="Favorites"
            >
              <Icon name="heart" />
            </NavLink>
            <NavLink
              to="/cart"
              className={styles.header__mobileIconLink}
              onClick={() => setMenuOpen(false)}
              aria-label="Cart"
            >
              <Icon name="cart" />
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
