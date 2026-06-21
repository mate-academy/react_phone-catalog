import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '../../../../../contexts/CartContext';
import { useFavorite } from '../../../../../contexts/FavoritesContext';
import styles from './Header.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { ThemeToggler } from '../../UI/ThemeToggler/ThemeToggler';
import { useTheme } from '../../../../../contexts/ThemeContext';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.isActive : ''} `;

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.iconLink} ${isActive ? styles.isActive : ''}`;

  const logoDark = '/img/icons/logo.svg';
  const logoLight = '/img/icons/logo-light.svg';
  const { theme } = useTheme();

  const { totalFavoriteItems } = useFavorite();
  const { totalItems } = useCart();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);
  const debouncedQuery = useDebounce(inputValue, 300);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (debouncedQuery) {
      newParams.set('query', debouncedQuery);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  }, [debouncedQuery]);

  const searchAvailableRoutes = ['/phones', '/tablets', '/accessories'];
  const isSearchVisible = searchAvailableRoutes.includes(location.pathname);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <Link to="/">
            <img
              className={styles.logo}
              src={theme === 'dark' ? logoDark : logoLight}
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

        {isSearchVisible && (
          <div className={styles.searchContainer}>
            <input
              type="search"
              placeholder="Search..."
              value={inputValue}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
        )}

        <div className={styles.icons}>
          <div>
            <ThemeToggler />
          </div>

          <div>
            <NavLink
              className={getIconClass}
              to="/favorites"
              aria-label="Favorites"
            >
              <img src="/img/icons/favorites.svg" alt="Favorites" />

              {totalFavoriteItems > 0 && (
                <span className={styles.addedProdutcs}>
                  {totalFavoriteItems}
                </span>
              )}
            </NavLink>
          </div>

          <div>
            <NavLink
              className={getIconClass}
              to="/cart"
              aria-label="Shopping bag"
            >
              <img src="/img/icons/shopping-bag.svg" alt="Shopping bag" />

              {totalItems > 0 && (
                <span className={styles.addedProdutcs}>{totalItems}</span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
