import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useContext, useState } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext, CartItem } from '../../context/CartContext';

export const Header = () => {
  const { favorites } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const totalCartItems = cart.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0,
  );

  const toggleMenu = () => {
    setIsOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : '';

      return !prev;
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const getNavClassLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.activeLink : styles.link;

  const links = (
    <>
      <li>
        <NavLink to="/" end className={getNavClassLink}>
          home
        </NavLink>
      </li>
      <li>
        <NavLink to="/phones" className={getNavClassLink}>
          phones
        </NavLink>
      </li>
      <li>
        <NavLink to="/tablets" className={getNavClassLink}>
          tablets
        </NavLink>
      </li>
      <li>
        <NavLink to="/accessories" className={getNavClassLink}>
          accessories
        </NavLink>
      </li>
    </>
  );

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.mainlogo}>
        <img src="/img/icons/logo.svg" alt="Logo" />
      </Link>
      <nav className={styles.navi}>
        <ul className={styles.list}>{links}</ul>
      </nav>
      <div className={styles.rightSection}>
        <div className={styles.backline}>
          <Link to="/favorites" className={styles.iconBox}>
            <img src="/img/icons/heart.svg" alt="heart" />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>
          <Link to="/cart" className={styles.iconBox}>
            <img src="/img/icons/bag.svg" alt="bag" />
            {totalCartItems > 0 && (
              <span className={styles.badge}>{totalCartItems}</span>
            )}
          </Link>
        </div>
        <button className={styles.burgerButton} onClick={toggleMenu}>
          <img
            src={isOpen ? '/img/icons/Close.svg' : '/img/icons/burger.svg'}
            alt="menu"
          />
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}
      >
        <nav>
          <ul className={styles.mobileList} onClick={closeMenu}>
            {links}
          </ul>
        </nav>
        <div className={styles.mobileIcons}>
          <NavLink
            to="/favorites"
            // className={styles.iconBox}
            className={({ isActive }) =>
              isActive ? styles.mobileIconActive : ''
            }
            onClick={closeMenu}
          >
            <img src="/img/icons/heart.svg" alt="heart" />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            // className={styles.iconBox}
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? styles.mobileIconActive : ''
            }
          >
            <img src="/img/icons/bag.svg" alt="bag" />
            {totalCartItems > 0 && (
              <span className={styles.badge}>{totalCartItems}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
