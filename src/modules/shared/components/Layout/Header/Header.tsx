import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useCart } from '../../../../../cart-context/CartContext';
import { useFavorite } from '../../../../../favorites-context/FavoritesContext';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.isActive : ''} `;

  const { totalFavoriteItems } = useFavorite();
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <Link to="/">
            <img
              className={styles.logo}
              src="/img/icons/logo.svg"
              alt="Page Logo"
            />
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <NavLink to="/" className={getLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/phones" className={getLinkClass}>
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink to="/tablets" className={getLinkClass}>
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink to="/accessories" className={getLinkClass}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.icons}>
          <div>
            <Link
              className={styles.iconLink}
              to="/favorites"
              aria-label="Favorites"
            >
              <img src="/img/icons/favorites.svg" alt="Favorites" />

              {totalFavoriteItems > 0 && (
                <span className={styles.addedProdutcs}>
                  {totalFavoriteItems}
                </span>
              )}
            </Link>
          </div>

          <div>
            <Link
              className={styles.iconLink}
              to="/cart"
              aria-label="Shopping bag"
            >
              <img src="/img/icons/shopping-bag.svg" alt="Shopping bag" />

              {totalItems > 0 && (
                <span className={styles.addedProdutcs}>{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
