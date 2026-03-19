import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Menu.module.scss';
import { useStore } from '../../context';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  const { cart, favorites } = useStore();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favCount = favorites.length;

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navLink, { [styles.isActive]: isActive });

  return (
    <div
      className={classNames(styles.menuOverlay, { [styles.isOpen]: isOpen })}
    >
      <header className={styles.header}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo} onClick={onClose}>
            <img
              src="img/logo-menu.svg"
              alt="Nice Gadgets"
              className={styles.logoImg}
            />
          </Link>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          <img src="img/icons/Close.svg" alt="Close" />
        </button>
      </header>

      <div className={styles.content}>
        <nav className={styles.nav}>
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
      </div>

      <div className={styles.footer}>
        <NavLink
          to="/favorites"
          className={styles.footerLink}
          onClick={onClose}
        >
          <div className={styles.iconWrapper}>
            <img
              src="img/icons/Favourites (Heart Like).svg"
              alt="Favorites"
              className={styles.icon}
            />
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </div>
        </NavLink>

        <NavLink to="/cart" className={styles.footerLink} onClick={onClose}>
          <div className={styles.iconWrapper}>
            <img
              src="img/icons/Shopping bag (Cart).svg"
              alt="Cart"
              className={styles.icon}
            />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
