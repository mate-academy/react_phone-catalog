import { useEffect, useMemo, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import styles from './Header.module.scss';

const searchRoutes = ['/phones', '/tablets', '/accessories', '/favorites'];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('query') ?? '');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { totalQuantity } = useCart();
  const { count } = useFavorites();

  const isSearchPage = useMemo(
    () => searchRoutes.some(route => location.pathname.startsWith(route)),
    [location.pathname],
  );

  useEffect(() => {
    setValue(new URLSearchParams(location.search).get('query') ?? '');
  }, [location.search]);

  useEffect(() => {
    if (!isSearchPage) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams);

      if (value) {
        nextParams.set('query', value);
      } else {
        nextParams.delete('query');
      }

      setSearchParams(nextParams, { replace: true });
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, isSearchPage, searchParams, setSearchParams]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span>Phone Catalog</span>
        </Link>

        <nav className={styles.navigation}>
          <Link to="/phones">Phones</Link>
          <Link to="/tablets">Tablets</Link>
          <Link to="/accessories">Accessories</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        <div
          className={`${styles.actions} ${
            isSearchFocused ? styles.actionsWithFocusedSearch : ''
          }`}
        >
          {isSearchPage && (
            <input
              className={styles.search}
              type="search"
              placeholder="Search products"
              value={value}
              onChange={event => setValue(event.target.value)}
              onBlur={() => setIsSearchFocused(false)}
              onFocus={() => setIsSearchFocused(true)}
            />
          )}
          <button
            type="button"
            className={styles.navButton}
            onClick={() => navigate('/favorites')}
            aria-label="Open favorites"
          >
            <i className="fa-regular fa-heart" aria-hidden="true" />
            <span>{count}</span>
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => navigate('/cart')}
            aria-label="Open cart"
          >
            <i className="fa-solid fa-bag-shopping" aria-hidden="true" />
            <span>{totalQuantity}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
