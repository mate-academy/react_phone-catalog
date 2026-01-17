import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useState } from 'react';
import { Icon } from '../Icon';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { favourites } = useFavourites();

  return (
    <header className={styles.header}>
      {/* Logo */}
      <Link to="/" className={styles.logo}>
        <Icon name="Logo" format="png" className={styles.logo} />
      </Link>
      {/* Navigation */}
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>
            <NavLink to="/" className={styles.navLink}>
              Home
            </NavLink>
          </li>
          <li className={styles.navListItem}>
            <NavLink to="/phones" className={styles.navLink}>
              Phones
            </NavLink>
          </li>
          <li className={styles.navListItem}>
            <NavLink to="/tablets" className={styles.navLink}>
              Tablets
            </NavLink>
          </li>
          <li className={styles.navListItem}>
            <NavLink to="/accessories" className={styles.navLink}>
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Icons */}
      <div className={styles.icons}>
        {/* <span className={styles.languageIcon} />

        <span className={styles.themeIcon} /> */}

        <Link to="/favourites" className={styles.iconLink}>
          <span className={styles.favIcon} />
          {favourites.length > 0 && (
            <span className={styles.counter}>{favourites.length}</span>
          )}
        </Link>

        <Link to="/cart" className={styles.iconLink}>
          <span className={styles.cartIcon} />
          {cart.length > 0 && (
            <span className={styles.counter}>{cart.length}</span>
          )}
        </Link>

        {/* Burger */}
        <span className={styles.menuIcon} onClick={() => setIsMenuOpen(true)} />
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div
          className={styles.menuBackdrop}
          onClick={() => setIsMenuOpen(false)}
        >
          <nav className={styles.menu} onClick={e => e.stopPropagation()}>
            <div className={styles.menuHeader}>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img src="/img/logo.png" alt="logo" />
              </Link>

              <span
                className={styles.iconClose}
                onClick={() => setIsMenuOpen(false)}
              />
            </div>

            <ul className={styles.menuList}>
              <li>
                <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/phones" onClick={() => setIsMenuOpen(false)}>
                  Phones
                </NavLink>
              </li>
              <li>
                <NavLink to="/tablets" onClick={() => setIsMenuOpen(false)}>
                  Tablets
                </NavLink>
              </li>
              <li>
                <NavLink to="/accessories" onClick={() => setIsMenuOpen(false)}>
                  Accessories
                </NavLink>
              </li>
            </ul>

            <div className={styles.menuFooter}>
              <Link to="/favourites">
                <span className={styles.favIcon} />
              </Link>

              <Link to="/cart">
                <span className={styles.cartIcon} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
