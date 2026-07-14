import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Buurgermenu.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.menu__link} ${styles['menu__link--active']}`
      : styles.menu__link;

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.menu__icon} ${styles['menu__icon--active']}`
      : styles.menu__icon;

  return (
    <aside className={styles.menu}>
      <div className={styles.menu__header}>
        <Link to="/" onClick={onClose} className={styles.menu__logo}>
          <img
            src={`${import.meta.env.BASE_URL}img/LogoBlack.svg`}
            alt="Nice Gadgets Logo"
          />
        </Link>
        <button className={styles.menu__close} onClick={onClose}>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/close.svg`}
            alt="Close menu"
            className={styles.menu__closeIcon}
          />
        </button>
      </div>

      <nav className={styles.menu__nav}>
        <NavLink to="/" className={getLinkClass} onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="/phones" className={getLinkClass} onClick={onClose}>
          Phones
        </NavLink>
        <NavLink to="/tablets" className={getLinkClass} onClick={onClose}>
          Tablets
        </NavLink>
        <NavLink to="/accessories" className={getLinkClass} onClick={onClose}>
          Accessories
        </NavLink>
      </nav>

      <div className={styles.menu__footer}>
        <NavLink to="/favorites" className={getIconClass} onClick={onClose}>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/heart.svg`}
            alt="Favorites"
          />
        </NavLink>
        <NavLink to="/cart" className={getIconClass} onClick={onClose}>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/busket.svg`}
            alt="Cart"
          />
        </NavLink>
      </div>
    </aside>
  );
};
