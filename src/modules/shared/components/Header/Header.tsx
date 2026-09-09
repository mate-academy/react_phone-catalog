import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/Logo.svg';
import favouritesIcon from '../../assets/icons/favourites.svg';
import cartIcon from '../../assets/icons/cart.svg';
import { navItems } from '../../constants/navigation';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

export const Header = () => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.active : styles.link;

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.icon} ${styles.iconActive}` : styles.icon;

  return (
    <header className={styles.header}>
      {/* логотип — обычная ссылка на главную */}
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" />
      </Link>

      {/* навигация */}
      <nav className={styles.nav}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={getLinkClass}
          >
            {item.text}
          </NavLink>
        ))}
      </nav>

      {/* иконки справа со счётчиками */}
      <div className={styles.icons}>
        <NavLink
          to="/favorites"
          className={getIconClass}
          aria-label="Favorites"
        >
          <img src={favouritesIcon} alt="" />
          {favorites.length > 0 && (
            <span className={styles.badge}>{favorites.length}</span>
          )}
        </NavLink>
        <NavLink to="/cart" className={getIconClass} aria-label="Cart">
          <img src={cartIcon} alt="" />
          {totalQuantity > 0 && (
            <span className={styles.badge}>{totalQuantity}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
