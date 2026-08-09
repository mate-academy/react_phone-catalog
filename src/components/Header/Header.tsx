/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import { NavLink } from 'react-router-dom';

import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';

import styles from './Header.module.scss';

export const Header = () => {
  const { totalItems } = useCart();
  const { favorites } = useFavorites();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.logo}>
            <img src="/img/logo/logo.png" alt="Nice Gadgets" />
          </NavLink>

          <nav className={styles.navigation}>
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
          <NavLink to="/favorites" className={styles.action}>
            <img
              src={
                favorites.length > 0
                  ? '/img/icons/heart-filled.png'
                  : '/img/icons/heart.png'
              }
              alt="Favorites"
              className={styles.icon}
            />

            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </NavLink>

          <NavLink to="/cart" className={styles.action}>
            <img src="/img/icons/cart.png" alt="Cart" className={styles.icon} />

            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
