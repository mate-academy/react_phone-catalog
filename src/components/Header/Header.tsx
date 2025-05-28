import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useSelector((state: RootState) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  );
  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.length,
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            <img src="./img/logo.png" alt="Phone Catalog Logo" />
          </Link>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                classNames(styles.link, { [styles.active]: isActive })
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/phones"
              className={({ isActive }) =>
                classNames(styles.link, { [styles.active]: isActive })
              }
            >
              Phones
            </NavLink>

            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                classNames(styles.link, { [styles.active]: isActive })
              }
            >
              Tablets
            </NavLink>

            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                classNames(styles.link, { [styles.active]: isActive })
              }
            >
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.right}>
          <button
            className={styles.burger}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <img src="./img/icons/burger.svg" alt="Menu" />
          </button>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.iconWrapper, { [styles.active]: isActive })
            }
          >
            <img
              src="./img/icons/favorites-icon.svg"
              alt="Favorites"
              className={styles.icon}
            />
            {favoritesCount > 0 && (
              <span className={styles.counter}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.iconWrapper, { [styles.active]: isActive })
            }
          >
            <img
              src="./img/icons/cart-icon.svg"
              alt="Cart"
              className={styles.icon}
            />
            {cartCount > 0 && (
              <span className={styles.counter}>{cartCount}</span>
            )}
          </NavLink>
        </div>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <Link to="/" className={styles.logo}>
              <img src="./img/logo.png" alt="Phone Catalog Logo" />
            </Link>
            <button
              className={styles.close}
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <img src="./img/icons/close.svg" alt="Close" />
            </button>
          </div>

          <nav className={styles.mobileNav}>
            <NavLink
              to="/"
              end
              onClick={toggleMenu}
              className={styles.mobileLink}
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              onClick={toggleMenu}
              className={styles.mobileLink}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              onClick={toggleMenu}
              className={styles.mobileLink}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              onClick={toggleMenu}
              className={styles.mobileLink}
            >
              Accessories
            </NavLink>
          </nav>
        </div>
      )}
      {isMenuOpen && (
        <div className={styles.mobileTabBar}>
          <NavLink
            to="/favorites"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              classNames(styles.mobileTabButton, {
                [styles.activeTab]: isActive,
              })
            }
          >
            <img src="./img/icons/favorites-icon.svg" alt="Favorites" />
            {favoritesCount > 0 && (
              <span className={styles.counter}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              classNames(styles.mobileTabButton, {
                [styles.activeTab]: isActive,
              })
            }
          >
            <img src="./img/icons/cart-icon.svg" alt="Cart" />
            {cartCount > 0 && (
              <span className={styles.counter}>{cartCount}</span>
            )}
          </NavLink>
        </div>
      )}
    </header>
  );
};
