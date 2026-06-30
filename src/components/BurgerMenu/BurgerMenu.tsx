import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  favoritesCount: number;
  cartCount: number;
}

export const BurgerMenu: React.FC<Props> = ({
  isOpen,
  onClose,
  favoritesCount,
  cartCount,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.menu__link} ${styles['menu__link--active']}`
      : styles.menu__link;

  const getBottomNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.menu__iconLink} ${styles['menu__iconLink--active']}`
      : styles.menu__iconLink;

  const menuClasses = isOpen
    ? `${styles.menu} ${styles['menu--open']}`
    : styles.menu;

  return (
    <aside className={menuClasses}>
      <div className={styles.menu__top}>
        <Link to="/" className={styles.menu__logo} onClick={onClose}>
          <img src="/icons/logo.svg" alt="Nice Gadgets" />
        </Link>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close menu"
        >
          <img src="/icons/close.svg" alt="Close" />
        </button>
      </div>

      <nav className={styles.menu__nav}>
        <NavLink to="/" className={getNavClass} onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="/phones" className={getNavClass} onClick={onClose}>
          Phones
        </NavLink>
        <NavLink to="/tablets" className={getNavClass} onClick={onClose}>
          Tablets
        </NavLink>
        <NavLink to="/accessories" className={getNavClass} onClick={onClose}>
          Accessories
        </NavLink>
      </nav>

      <div className={styles.menu__bottom}>
        <NavLink
          to="/favorites"
          className={getBottomNavClass}
          onClick={onClose}
        >
          <img src="/icons/heart-empty.svg" alt="Favorites" />

          {favoritesCount > 0 && (
            <span className={styles.menu__badge}>{favoritesCount}</span>
          )}
        </NavLink>

        <NavLink to="/cart" className={getBottomNavClass} onClick={onClose}>
          <img src="/icons/cart.svg" alt="Cart" />

          {cartCount > 0 && (
            <span className={styles.menu__badge}>{cartCount}</span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
