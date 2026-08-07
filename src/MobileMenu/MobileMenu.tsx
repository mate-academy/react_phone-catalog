// .. MobileMenu.tsx
import styles from './MobileMenu.module.scss';
import { NavLink } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { useCart } from '../context/CartContext';

import favouriteIcon from '/icons/icon-favourites.svg';
import shoppingBagIcon from '/icons/icon-shopping-bag.svg';

interface MobileMenuProps {
  onClose: () => void;
}

export const MobileMenu = ({ onClose }: MobileMenuProps) => {
  const { favouritesCount } = useFavourites();
  const { cartCount } = useCart();

  return (
    <div className={styles.body}>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
              to="/"
            >
              home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
              to="/phones"
            >
              Phones
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
              to="/tablets"
            >
              tablets
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.linkActive}` : styles.link
              }
              to="/accessories"
            >
              accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.action}>
        <NavLink
          onClick={onClose}
          to="/favourites"
          className={({ isActive }) =>
            isActive
              ? `${styles.favourites} ${styles.iconActive}`
              : styles.favourites
          }
        >
          <div className={styles.wraperIcons}>
            <img
              src={favouriteIcon}
              alt="favourites"
              className={styles.icons}
            />
            <span className={styles.badge}>{favouritesCount}</span>
          </div>
        </NavLink>

        <NavLink
          onClick={onClose}
          to="/cart"
          className={({ isActive }) =>
            isActive ? `${styles.bag} ${styles.iconActive}` : styles.bag
          }
        >
          <div className={styles.wraperIcons}>
            <img
              src={shoppingBagIcon}
              alt="icon-shopping-bag"
              className={styles.icons}
            />
            <span className={styles.badge}>{cartCount || 0}</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
