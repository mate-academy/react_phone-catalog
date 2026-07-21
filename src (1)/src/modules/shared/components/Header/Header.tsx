import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './Header.module.scss';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;
};

export const Header = () => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <NavLink to="/" className={styles.logo}>
          Nice Gadgets
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/phones" className={getNavLinkClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getNavLinkClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getNavLinkClass}>
            Accessories
          </NavLink>
        </nav>
      </div>

      <div className={styles.icons}>
        <NavLink to="/favorites" className={getNavLinkClass}>
          Favorites{favorites.length > 0 && ` (${favorites.length})`}
        </NavLink>
        <NavLink to="/cart" className={getNavLinkClass}>
          Cart{totalQuantity > 0 && ` (${totalQuantity})`}
        </NavLink>
      </div>
    </header>
  );
};
