import React, { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { ICON_PATHS } from '../../shared/constants/IconPaths';
import { PRODUCT_CATEGORIES } from '../../shared/constants/ProductCategories';
import { useMediaQuery } from '../../shared/hooks/useMediaQuery';
import { BREAKPOINTS } from '../../shared/constants/Breakpoints';
import { MobileMenu } from './MobileMenu';
// eslint-disable-next-line max-len
import { useCartFavoritesContext } from '../../shared/hooks/useCartFavoritesContext';
import useDebouncedValue from '../../shared/hooks/useDebounceValue';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, favorites } = useCartFavoritesContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const debouncedQuery = useDebouncedValue(query, 350);

  const searchRoutes = ['/phones', '/tablets', '/accessories'];
  const showSearch = searchRoutes.some(r => location.pathname.startsWith(r));

  const isMobile = useMediaQuery(BREAKPOINTS.mobile);
  const favoritesCount = favorites.length;
  const cartCount = cart.length;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedQuery) {
      params.set('query', debouncedQuery.trim().toLowerCase());
    } else {
      params.delete('query');
    };

    setSearchParams(params, { replace: true });
  }, [debouncedQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchClear = () => {
    setQuery('');
  };

  return (
    <header className={styles.headerMain}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src={ICON_PATHS.logo} alt="Logo" />
        </Link>

        {!isMobile && (
          <>
            <div className={styles.navBar}>
              <NavLink to="/" className={styles.navBar__links} replace>
                HOME
              </NavLink>

              {PRODUCT_CATEGORIES.map(category => (
                <NavLink
                  key={category}
                  to={`/${category}`}
                  className={styles.navBar__links}
                >
                  {category.toUpperCase()}
                </NavLink>
              ))}
            </div>

            {showSearch && (
              <div className={styles.headerSearch}>
                <input
                  type="search"
                  placeholder="Search..."
                  value={query}
                  onChange={handleSearchChange}
                  className={styles.headerSearch__input}
                  autoComplete="off"
                />

                {query ? (
                  <img
                    src={ICON_PATHS.close}
                    alt="Clear"
                    className={styles.headerSearch__clear}
                    onClick={handleSearchClear}
                  />
                ) : (
                  <img
                    src={ICON_PATHS.search}
                    alt="Search"
                    className={styles.headerSearch__icon}
                  />
                )}
              </div>
            )}

            <div className={styles.headerIcons}>
              <button
                className={`${styles.button} ${location.pathname === '/favorites' ? 'active' : ''}`}
                onClick={() => navigate('/favorites')}
              >
                <img
                  src={ICON_PATHS.heart}
                  alt="Favorites"
                  className={styles.headerIcons__icon}
                />

                {favoritesCount > 0 && (
                  <span className={styles.badge}>{favoritesCount}</span>
                )}
              </button>

              <button
                className={`${styles.button} ${location.pathname === '/cart' ? 'active' : ''}`}
                onClick={() => navigate('/cart')}
              >
                <img
                  src={ICON_PATHS.cart}
                  alt="Cart"
                  className={styles.headerIcons__icon}
                />

                {cartCount > 0 && (
                  <span className={styles.badge}>{cartCount}</span>
                )}
              </button>
            </div>
          </>
        )}

        {isMobile && (
          <div className={styles.headerIcons}>
            <button className={styles.burgerButton} onClick={toggleMobileMenu}>
              <img
                src={ICON_PATHS.burger}
                alt="Menu"
                className={styles.headerIcons__icon}
              />
            </button>
          </div>
        )}

        {isMobile && (
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            favoritesCount={favoritesCount}
            cartCount={cartCount}
          />
        )}
      </div>
    </header>
  );
};
