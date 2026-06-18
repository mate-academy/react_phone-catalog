import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import { BurgerMenu } from '../BurgerMenu/';
import styles from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cart = useAppSelector(state => state.shop.cart);
  const favourites = useAppSelector(state => state.shop.favourites);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const favCount = favourites.length;

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src="img/Logo.svg" alt="Logo" className={styles.logoLink} />
        </Link>

        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Accessories
            </NavLink>
          </div>
        </nav>

        <div className={styles.icons}>
          <Link to="/favourites" className={styles.iconFavourite}>
            <img src="img/Favourites-header.svg" alt="Favourites" />
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </Link>

          <Link to="/cart" className={styles.iconCart}>
            <img src="img/Cart.svg" alt="Cart" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </div>

        <div className={styles.menu}>
          <button
            type="button"
            className={styles.menuIcon}
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <img
              src={isMenuOpen ? '/img/Close.svg' : '/img/Menu.svg'}
              alt="Menu"
            />
          </button>
        </div>
      </div>

      <BurgerMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};
