import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BurgerMenu.module.scss';
import close from './components/img/Close.png';
import logo from '../Header/components/img/logo.png';
import favourites from '../Header/components/img/favourites.png';
import bag from '../Header/components/img/bag.png';

interface Props {
  onClose: () => void;
}

export const BurgerMenu: React.FC<Props> = ({ onClose }) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  const getActionLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.actionLink} ${styles.actionLinkActive}`
      : styles.actionLink;

  return (
    <div className={styles.menu}>
      <div className={styles.top}>
        <NavLink to="/" className={styles.logo} onClick={onClose}>
          <img className={styles.logoImage} src={logo} alt="Nice Gadgets" />
        </NavLink>

        <button
          className={styles.closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
        >
          <img src={close} className={styles.closeIcon} alt="" />
        </button>
      </div>

      <nav className={styles.nav}>
        <NavLink to="/" end className={getNavLinkClass} onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="/phones" className={getNavLinkClass} onClick={onClose}>
          Phones
        </NavLink>
        <NavLink to="/tablets" className={getNavLinkClass} onClick={onClose}>
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          className={getNavLinkClass}
          onClick={onClose}
        >
          Accessories
        </NavLink>
      </nav>

      <div className={styles.actions}>
        <NavLink
          to="/favorites"
          className={getActionLinkClass}
          onClick={onClose}
          aria-label="Go to favourites"
        >
          <img src={favourites} alt="" className={styles.actionIcon} />
        </NavLink>

        <NavLink
          to="/cart"
          className={getActionLinkClass}
          onClick={onClose}
          aria-label="Go to cart"
        >
          <img src={bag} alt="" className={styles.actionIcon} />
        </NavLink>
      </div>
    </div>
  );
};
