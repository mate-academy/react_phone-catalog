import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.scss';
import { Icon } from '../Icon';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { favourites } = useFavourites();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      {/* LOGO */}
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        <Icon name="Logo" format="png" className={styles.logoImage} />
      </Link>

      {/* DESKTOP NAV */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLink__active : ''}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLink__active : ''}`
              }
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLink__active : ''}`
              }
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLink__active : ''}`
              }
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* ICONS */}
      <div className={styles.icons}>
        <Link to="/favourites" className={styles.iconLink} onClick={closeMenu}>
          <span className={styles.favIcon} />
          {favourites.length > 0 && (
            <span className={styles.counter}>{favourites.length}</span>
          )}
        </Link>

        <Link to="/cart" className={styles.iconLink} onClick={closeMenu}>
          <span className={styles.cartIcon} />
          {cart.length > 0 && (
            <span className={styles.counter}>{cart.length}</span>
          )}
        </Link>

        {/* BURGER */}
        <button
          type="button"
          className={styles.menuIcon}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <span className={styles.menuIcon__burger}></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`${styles.menuBackdrop} ${isMenuOpen ? styles.menuBackdrop__isActive : ''}`}
        onClick={closeMenu}
      >
        <nav
          className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}
          onClick={e => e.stopPropagation()}
          aria-hidden={!isMenuOpen}
        >
          {/* MENU HEADER */}
          <div className={styles.menuHeader}>
            <Link to="/" onClick={closeMenu}>
              <Icon name="Logo" format="png" className={styles.logoImage} />
            </Link>

            <button
              type="button"
              className={styles.iconClose}
              aria-label="Close menu"
              onClick={closeMenu}
            />
          </div>

          {/* MENU LIST */}
          <ul className={styles.menuList}>
            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.menuLink} ${isActive ? styles.menuLink__active : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.menuLink} ${isActive ? styles.menuLink__active : ''}`
                }
              >
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.menuLink} ${isActive ? styles.menuLink__active : ''}`
                }
              >
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.menuLink} ${isActive ? styles.menuLink__active : ''}`
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>

          {/* MENU FOOTER */}
          <div className={styles.menuFooter}>
            <Link
              to="/favourites"
              className={styles.iconLinkBurger}
              onClick={closeMenu}
            >
              <span className={styles.favIconBurger} />
              {favourites.length > 0 && (
                <span className={styles.counterBurger}>
                  {favourites.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className={styles.iconLinkBurger}
              onClick={closeMenu}
            >
              <span className={styles.cartIconBurger} />
              {cart.length > 0 && (
                <span className={styles.counterBurger}>{cart.length}</span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
