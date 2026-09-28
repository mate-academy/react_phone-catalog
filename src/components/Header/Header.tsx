import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { normalizePath } from '../../api/products';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavsCount = favorites ? favorites.length : 0;

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navGroup}>
          <Link to="/" className={styles.logoLink}>
            <img
              src={normalizePath('/img/logo.svg')}
              alt="Nice Gadgets Logo"
              className={styles.logo}
            />
          </Link>

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

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.iconBtn} ${styles.iconBtnActive}`
                : styles.iconBtn
            }
          >
            <div className={styles.iconWrapper}>
              <div className={`${styles.icon} ${styles.favIcon}`} />
              {totalFavsCount > 0 && (
                <span className={styles.badge}>{totalFavsCount}</span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.iconBtn} ${styles.iconBtnActive}`
                : styles.iconBtn
            }
          >
            <div className={styles.iconWrapper}>
              <div className={`${styles.icon} ${styles.cartIcon}`} />
              {totalCartCount > 0 && (
                <span className={styles.badge}>{totalCartCount}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
