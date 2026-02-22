import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { CartContext } from '../../context/CartContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import { Search } from '../Search';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.navLink, { [styles.navLinkActive]: isActive });

const getIconClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.iconLink, { [styles.iconLinkActive]: isActive });

const pagesWithSearch = ['/phones', '/tablets', '/accessories', '/favorites'];

export const Header: React.FC = () => {
  const { totalItems } = useContext(CartContext);
  const { favoritesCount } = useContext(FavoritesContext);
  const location = useLocation();

  const showSearch = pagesWithSearch.some(path =>
    location.pathname.startsWith(path),
  );

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <NavLink to="/" className={styles.logo}>
          <img
            src="img/logo.svg"
            alt="Phone Catalog"
            className={styles.logo__img}
          />
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={getLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            Accessories
          </NavLink>
        </nav>
      </div>

      {showSearch && <Search />}

      <div className={styles.right}>
        <NavLink to="/favorites" className={getIconClass}>
          <img
            src="img/icons/heart.svg"
            alt="Favorites"
            className={styles.icon}
          />
          {favoritesCount > 0 && (
            <span className={styles.badge}>{favoritesCount}</span>
          )}
        </NavLink>

        <NavLink to="/cart" className={getIconClass}>
          <img
            src="img/icons/cart.svg"
            alt="Shopping Cart"
            className={styles.icon}
          />
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </NavLink>
      </div>
    </header>
  );
};
