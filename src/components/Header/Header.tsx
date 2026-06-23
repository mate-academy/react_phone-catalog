import '@fortawesome/fontawesome-free/css/all.min.css';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { SearchBar } from '../SearchBar';
import { ThemeToggle } from '../ThemeToggle';
import { useCart } from '../../modules/shared/context/CartContext';
import { useFavorites } from '../../modules/shared/context/FavoritesContext';
import { Category } from '../../modules/shared/types/catalog';
import { getCategoryLabel } from '../../modules/shared/utils/catalog';
import styles from './Header.module.scss';

const catalogPages: Category[] = ['phones', 'tablets', 'accessories'];

export const Header = () => {
  const location = useLocation();
  const { totalQuantity } = useCart();
  const { favoritesCount } = useFavorites();

  const currentCatalogPage = catalogPages.find(category =>
    location.pathname.startsWith(`/${category}`),
  );

  const isFavoritesPage = location.pathname.startsWith('/favorites');
  const showSearch = Boolean(currentCatalogPage || isFavoritesPage);

  const searchPlaceholder = currentCatalogPage
    ? `Search in ${getCategoryLabel(currentCatalogPage).toLowerCase()}...`
    : 'Search in favorites...';

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo />
          <nav className={styles.nav}>
            {catalogPages.map(category => (
              <NavLink
                key={category}
                to={`/${category}`}
                className={({ isActive }) =>
                  classNames(styles.navLink, {
                    [styles.navLinkActive]: isActive,
                  })
                }
              >
                {getCategoryLabel(category)}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.tools}>
          {showSearch && <SearchBar placeholder={searchPlaceholder} />}
          <ThemeToggle />
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.iconLink, { [styles.iconLinkActive]: isActive })
            }
            aria-label="Favorites"
          >
            <i className="fa-solid fa-heart" />
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.iconLink, { [styles.iconLinkActive]: isActive })
            }
            aria-label="Cart"
          >
            <i className="fa-solid fa-bag-shopping" />
            {totalQuantity > 0 && (
              <span className={styles.badge}>{totalQuantity}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
