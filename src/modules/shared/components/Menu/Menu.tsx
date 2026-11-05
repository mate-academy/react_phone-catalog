import React, { useContext, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Menu.module.scss';
import { CartContext } from '../../../../store/CartContext';
import { FavoritesContext } from '../../../../store/FavoritesContext';
import { Counter } from '../Counter';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navLink, { [styles.navLinkActive]: isActive });

const getBottomLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.bottomLink, { [styles.bottomLinkActive]: isActive });

export const Menu: React.FC<Props> = ({ isOpen, onClose }) => {
  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Prevent page scrolling behind the open menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={classNames(styles.menu, { [styles.menuOpen]: isOpen })}>
      <div className={styles.top}>
        <Link
          to="/"
          className={styles.topLogo}
          aria-label="Nice Gadgets"
          onClick={onClose}
        ></Link>
        <button className={styles.topClose} type="button" onClick={onClose}>
          <span className={styles.topCloseIcon}></span>
        </button>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink to="/" className={getNavLinkClass} onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/phones" className={getNavLinkClass} onClick={onClose}>
              Phones
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/tablets"
              className={getNavLinkClass}
              onClick={onClose}
            >
              Tablets
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/accessories"
              className={getNavLinkClass}
              onClick={onClose}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.bottom}>
        <NavLink
          to="/favorites"
          className={getBottomLinkClass}
          aria-label="Favorites"
          onClick={onClose}
        >
          <span className={styles.bottomIconFavorites} aria-hidden="true" />
          <Counter value={favorites.length} />
        </NavLink>
        <NavLink
          to="/cart"
          className={getBottomLinkClass}
          onClick={onClose}
          aria-label="Cart"
        >
          <span className={styles.bottomIconCart} aria-hidden="true" />
          <Counter value={totalCount} />
        </NavLink>
      </div>
    </div>
  );
};
