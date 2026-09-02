import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../../shared/context/CartContext';
import { useFavorites } from '../../../shared/context/FavoritesContext';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { totalCount } = useCart();
  const { favoritesCount } = useFavorites();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.isActive : ''}`;

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.iconLink} ${isActive ? styles.isActive : ''}`;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <NavLink to="/" className={styles.logo}>
          <img
            src={`${import.meta.env.BASE_URL}img/icons/logo.svg`}
            alt="Nice Gadgets Logo"
          />
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={getLinkClass}>
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

      <div className={styles.right}>
        <NavLink to="/favorites" className={getIconClass}>
          <div className={styles.iconWrapper}>
            <img
              src={`${import.meta.env.BASE_URL}img/icons/heart.svg`}
              alt="Favorites"
            />
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className={getIconClass}>
          <div className={styles.iconWrapper}>
            <img
              src={`${import.meta.env.BASE_URL}img/icons/shopping-bag.svg`}
              alt="Cart"
            />
            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </div>
        </NavLink>
      </div>
    </header>
  );
};
