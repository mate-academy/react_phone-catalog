import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.scss';
import { useCart, useFavorites } from '../../context';

interface MenuProps {
  onClose: () => void;
}

export const Menu: React.FC<MenuProps> = ({ onClose }) => {
  const { totalCount } = useCart();
  const { totalFavorites } = useFavorites();

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.isActive : ''}`;

  const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.iconLink} ${isActive ? styles.iconActive : ''}`;

  return (
    <div className={styles.menuContainer}>
      <nav className={styles.nav}>
        <NavLink to="/" className={getNavLinkClass} onClick={onClose}>
          HOME
        </NavLink>
        <NavLink to="/phones" className={getNavLinkClass} onClick={onClose}>
          PHONES
        </NavLink>
        <NavLink to="/tablets" className={getNavLinkClass} onClick={onClose}>
          TABLETS
        </NavLink>
        <NavLink
          to="/accessories"
          className={getNavLinkClass}
          onClick={onClose}
        >
          ACCESSORIES
        </NavLink>
      </nav>

      <div className={styles.bottomButtons}>
        <NavLink to="/favorites" className={getIconLinkClass} onClick={onClose}>
          <div className={styles.iconWrapper}>
            <img
              src="img/icons/Favourites.svg"
              alt="Favorites"
              className={styles.icon}
            />
            {totalFavorites > 0 && (
              <span className={styles.badge}>{totalFavorites}</span>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className={getIconLinkClass} onClick={onClose}>
          <div className={styles.iconWrapper}>
            <img
              src="img/icons/ShoppingBag.svg"
              alt="Shopping bag"
              className={styles.icon}
            />
            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
