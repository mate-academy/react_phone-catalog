import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './Header.module.scss';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

const getMenuLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.menuLink} ${styles.menuLinkActive}` : styles.menuLink;

export const Header = () => {
  const { favorites } = useFavorites();
  const { totalCount } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="img/icons/logo.svg" alt="Nice Gadgets" height="28" />
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/" className={getNavLinkClass}>
            HOME
          </NavLink>
          <NavLink to="/phones" className={getNavLinkClass}>
            PHONES
          </NavLink>
          <NavLink to="/tablets" className={getNavLinkClass}>
            TABLETS
          </NavLink>
          <NavLink to="/accessories" className={getNavLinkClass}>
            ACCESSORIES
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <Link to="/favorites" className={styles.action}>
            <img
              src="img/icons/heart.svg"
              alt="Favorites"
              width="16"
              height="16"
            />

            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>

          <Link to="/cart" className={styles.action}>
            <img src="img/icons/cart.svg" alt="Cart" width="16" height="16" />

            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </Link>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <span className={styles.burgerLines} />
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.menu}>
          <div className={styles.menuTop}>
            <Link to="/" className={styles.logo} onClick={closeMenu}>
              <img src="img/icons/logo.svg" alt="Nice Gadgets" height="28" />
            </Link>

            <button
              type="button"
              className={styles.close}
              aria-label="Close menu"
              onClick={closeMenu}
            >
              ×
            </button>
          </div>

          <nav className={styles.menuNav}>
            <NavLink to="/" className={getMenuLinkClass} onClick={closeMenu}>
              HOME
            </NavLink>
            <NavLink
              to="/phones"
              className={getMenuLinkClass}
              onClick={closeMenu}
            >
              PHONES
            </NavLink>
            <NavLink
              to="/tablets"
              className={getMenuLinkClass}
              onClick={closeMenu}
            >
              TABLETS
            </NavLink>
            <NavLink
              to="/accessories"
              className={getMenuLinkClass}
              onClick={closeMenu}
            >
              ACCESSORIES
            </NavLink>
          </nav>

          <div className={styles.menuActions}>
            <Link
              to="/favorites"
              className={styles.menuAction}
              aria-label="Favorites"
              onClick={closeMenu}
            >
              <span className={styles.menuIcon}>
                <img src="img/icons/heart.svg" alt="" width="16" height="16" />

                {favorites.length > 0 && (
                  <span className={styles.badge}>{favorites.length}</span>
                )}
              </span>
            </Link>

            <Link
              to="/cart"
              className={styles.menuAction}
              aria-label="Cart"
              onClick={closeMenu}
            >
              <span className={styles.menuIcon}>
                <img src="img/icons/cart.svg" alt="" width="16" height="16" />

                {totalCount > 0 && (
                  <span className={styles.badge}>{totalCount}</span>
                )}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
