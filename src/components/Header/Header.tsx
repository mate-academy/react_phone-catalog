import classNames from 'classnames';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import { useCart } from '../../modules/shared/context/CartContext';
import { useFavorites } from '../../modules/shared/context/FavoritesContext';
import { useDebouncedValue } from '../../modules/shared/hooks';
import styles from './Header.module.scss';

const searchPaths = ['/phones', '/tablets', '/accessories', '/favorites'];

export const Header = () => {
  const { cartQuantity } = useCart();
  const { favoritesQuantity } = useFavorites();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const shouldShowSearch = searchPaths.includes(location.pathname);
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const debouncedQuery = useDebouncedValue(query);

  const navItems = useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/phones', label: 'Phones' },
      { to: '/tablets', label: 'Tablets' },
      { to: '/accessories', label: 'Accessories' },
    ],
    [],
  );

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [location.pathname, searchParams]);

  useEffect(() => {
    if (!shouldShowSearch) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (debouncedQuery.trim()) {
      params.set('query', debouncedQuery.trim());
      params.delete('page');
    } else {
      params.delete('query');
    }

    if (params.toString() === searchParams.toString()) {
      return;
    }

    setSearchParams(params, { replace: true });
  }, [debouncedQuery, searchParams, setSearchParams, shouldShowSearch]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <NavLink to="/" className={styles.logo} aria-label="Nice Gadgets">
          <span>NICE</span>
          <span>GADGETS</span>
        </NavLink>

        <nav className={styles.nav} aria-label="Main navigation">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                classNames(styles.navLink, {
                  [styles.navLinkActive]: isActive,
                })
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {shouldShowSearch && (
          <div className={styles.search}>
            <i className="fa-solid fa-magnifying-glass" />

            <input
              id="header-search"
              type="search"
              aria-label="Search products"
              placeholder="Search"
              value={query}
              onChange={handleQueryChange}
            />
          </div>
        )}

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.iconLink, {
                [styles.iconLinkActive]: isActive,
              })
            }
            aria-label="Favorites"
          >
            <i className="fa-regular fa-heart" />

            {favoritesQuantity > 0 && (
              <span className={styles.badge}>{favoritesQuantity}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.iconLink, {
                [styles.iconLinkActive]: isActive,
              })
            }
            aria-label="Cart"
          >
            <i className="fa-solid fa-bag-shopping" />

            {cartQuantity > 0 && (
              <span className={styles.badge}>{cartQuantity}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
