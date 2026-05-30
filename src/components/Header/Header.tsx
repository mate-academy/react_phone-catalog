import { useContext, useEffect, useState } from 'react';
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { AppContext } from '../../context/AppContext';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './Header.module.scss';

const SEARCH_PATHS = ['/phones', '/tablets', '/accessories', '/favorites'];

export const Header = () => {
  const context = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('query') ?? '',
  );
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    if (!SEARCH_PATHS.some(path => location.pathname.startsWith(path))) {
      return;
    }

    const query = searchParams.get('query') ?? '';

    if (query !== debouncedSearch) {
      const next = new URLSearchParams(searchParams);

      if (debouncedSearch.trim()) {
        next.set('query', debouncedSearch.trim());
      } else {
        next.delete('query');
      }

      setSearchParams(next, { replace: true });
    }
  }, [debouncedSearch, location.pathname, searchParams, setSearchParams]);

  useEffect(() => {
    const query = searchParams.get('query') ?? '';

    setSearchValue(query);
  }, [location.pathname]);

  if (!context) {
    return null;
  }

  const { cartQuantity, favoritesCount } = context;
  const showSearch = SEARCH_PATHS.some(path =>
    location.pathname.startsWith(path),
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.brandIcon}>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              {/* eslint-disable-next-line max-len */}
              <path d="M17 1H7C5.9 1 5 1.9 5 3v18c0 1.1.9 2 2 2h10c1.1 0 2-0.9 2-2V3c0-1.1-0.9-2-2-2zm0 18H7V5h10v14zm-5 2c-0.55 0-1-.45-1-1s0.45-1 1-1 1 .45 1 1-0.45 1-1 1zm3-4H9V7h6v10z" />
            </svg>
          </span>
          <span className={styles.logoBrand}>Nice</span> Gadgets
        </NavLink>
        <div className={styles.navigationWrapper}>
          <nav className={styles.navigation}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames(styles.link, { [styles.active]: isActive })
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                classNames(styles.link, { [styles.active]: isActive })
              }
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                classNames(styles.link, { [styles.active]: isActive })
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                classNames(styles.link, { [styles.active]: isActive })
              }
            >
              Accessories
            </NavLink>
          </nav>
          {showSearch && (
            <div className={styles.search}>
              <span className="fa fa-search" />
              <input
                value={searchValue}
                onChange={event => setSearchValue(event.target.value)}
                placeholder="Search products"
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    navigate(
                      location.pathname +
                        `?query=${encodeURIComponent(searchValue.trim())}`,
                    );
                  }
                }}
              />
            </div>
          )}
        </div>
        <div className={styles.controls}>
          <NavLink to="/favorites" className={styles.iconButton}>
            <span className="fa fa-heart" />
            <span className={styles.badge}>{favoritesCount}</span>
          </NavLink>
          <NavLink to="/cart" className={styles.iconButton}>
            <span className="fa fa-shopping-cart" />
            <span className={styles.badge}>{cartQuantity}</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
