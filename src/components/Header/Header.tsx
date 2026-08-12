import { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import { Icon } from '../Icon';
import { LanguageToggle } from '../LanguageToggle';
import { Logo } from '../Logo';
import { MobileMenu } from '../MobileMenu';
import { SearchInput } from '../SearchInput';
import { ThemeToggle } from '../ThemeToggle';
import { NAV_ITEMS } from '../../constants/navItems';
import { ROUTES } from '../../constants/routes';
import { useTranslation } from '../../hooks';
import { useAppSelector } from '../../store/hooks';
import styles from './Header.module.scss';

const SEARCH_PATHS = ['/phones', '/tablets', '/accessories', '/favorites'];

const SEARCH_DEBOUNCE = 500;

const MOBILE_MENU_ID = 'mobile-menu';

export const Header = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = useTranslation();

  const favoriteCount = useAppSelector(state => state.favorites.itemIds.length);

  const cartCount = useAppSelector(state => {
    return state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  });

  const isSearchVisible = SEARCH_PATHS.includes(location.pathname);

  const queryFromUrl = searchParams.get('query') || '';

  const [searchValue, setSearchValue] = useState(queryFromUrl);

  useEffect(() => {
    setSearchValue(queryFromUrl);
  }, [queryFromUrl, location.pathname]);

  useEffect(() => {
    if (!isSearchVisible) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const trimmedValue = searchValue.trim();
      const currentQuery = searchParams.get('query') || '';

      if (trimmedValue === currentQuery) {
        return;
      }

      const params = new URLSearchParams(searchParams);

      if (trimmedValue) {
        params.set('query', trimmedValue);
      } else {
        params.delete('query');
      }

      params.delete('page');

      setSearchParams(params, {
        replace: true,
      });
    }, SEARCH_DEBOUNCE);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchValue, isSearchVisible, searchParams, setSearchParams]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isMenuOpen) {
      html.classList.add('menu-open');
      body.classList.add('menu-open');
    } else {
      html.classList.remove('menu-open');
      body.classList.remove('menu-open');
    }

    return () => {
      html.classList.remove('menu-open');
      body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const getSearchPlaceholder = () => {
    switch (location.pathname) {
      case ROUTES.phones:
        return t.header.searchPhones;

      case ROUTES.tablets:
        return t.header.searchTablets;

      case ROUTES.accessories:
        return t.header.searchAccessories;

      case ROUTES.favorites:
        return t.header.searchFavorites;

      default:
        return t.header.search;
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.content}>
          <Logo />

          <nav className={styles.nav} aria-label={t.header.mainNavigation}>
            {NAV_ITEMS.map(({ labelKey, path }) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
                key={path}
                to={path}
              >
                {t.header[labelKey]}
              </NavLink>
            ))}
          </nav>

          {isSearchVisible && (
            <div className={styles.search}>
              <SearchInput
                value={searchValue}
                placeholder={getSearchPlaceholder()}
                clearLabel={t.header.clearSearch}
                onChange={setSearchValue}
                onClear={handleClearSearch}
              />
            </div>
          )}

          <div className={styles.actions}>
            <div className={styles.actionButton}>
              <ThemeToggle />
            </div>

            <div className={styles.actionButton}>
              <LanguageToggle />
            </div>

            <NavLink
              aria-label={`${t.header.favorites}: ${favoriteCount}`}
              className={({ isActive }) =>
                isActive
                  ? `${styles.actionLink} ${styles.actionLinkActive}`
                  : styles.actionLink
              }
              to={ROUTES.favorites}
            >
              <Icon name="heart" size={16} />

              {favoriteCount > 0 && (
                <span className={styles.badge} aria-hidden="true">
                  {favoriteCount}
                </span>
              )}
            </NavLink>

            <NavLink
              aria-label={`${t.header.cart}: ${cartCount}`}
              className={({ isActive }) =>
                isActive
                  ? `${styles.actionLink} ${styles.actionLinkActive}`
                  : styles.actionLink
              }
              to={ROUTES.cart}
            >
              <Icon name="cart" size={16} />

              {cartCount > 0 && (
                <span className={styles.badge} aria-hidden="true">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>

          <button
            className={styles.menuButton}
            type="button"
            aria-label={t.header.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setIsMenuOpen(true)}
          >
            <Icon name="menu" size={16} />
          </button>
        </div>
      </header>

      <MobileMenu
        id={MOBILE_MENU_ID}
        isOpen={isMenuOpen}
        favoriteCount={favoriteCount}
        cartCount={cartCount}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};
