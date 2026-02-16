import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  favouritesCount: number;
  cartCount: number;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  favouritesCount,
  cartCount,
}) => {
  return (
    <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
      <nav className={styles.menu__nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : '')}
          onClick={onClose}
        >
          Home
        </NavLink>
        <NavLink
          to="/products/phones"
          className={({ isActive }) => (isActive ? styles.active : '')}
          onClick={onClose}
        >
          Phones
        </NavLink>
        <NavLink
          to="/products/tablets"
          className={({ isActive }) => (isActive ? styles.active : '')}
          onClick={onClose}
        >
          Tablets
        </NavLink>
        <NavLink
          to="/products/accessories"
          className={({ isActive }) => (isActive ? styles.active : '')}
          onClick={onClose}
        >
          Accessories
        </NavLink>
      </nav>

      <div className={styles.menu__actions}>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            `${styles.menu__action} ${isActive ? styles.active : ''}`
          }
          onClick={onClose}
        >
          <img src="icons/Favourites (Heart Like).svg" alt="Favourites" />
          {favouritesCount > 0 && (
            <span className={styles.menu__badge}>{favouritesCount}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles.menu__action} ${isActive ? styles.active : ''}`
          }
          onClick={onClose}
        >
          <img src="icons/Shopping bag (Cart).svg" alt="Cart" />
          {cartCount > 0 && (
            <span className={styles.menu__badge}>{cartCount}</span>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
