import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';

import styles from './Header.module.scss';

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const query = searchParams.get('query') || '';
  const [localQuery, setLocalQuery] = useState(query);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setLocalQuery(query);
  }, [query, pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if ((searchParams.get('query') || '') !== localQuery) {
        const nextParams = new URLSearchParams(searchParams);

        if (localQuery.trim()) {
          nextParams.set('query', localQuery);
        } else {
          nextParams.delete('query');
        }

        nextParams.delete('page');
        setSearchParams(nextParams);
      }
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [localQuery, searchParams, setSearchParams]);

  const showSearch = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favorites',
  ].includes(pathname);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    const nextParams = new URLSearchParams(searchParams);

    nextParams.delete('query');
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  return (
    <>
      <header className={styles.header} data-testid="header">
        <Link
          to="/"
          className={styles.logoRow}
          aria-label="Phone Catalog Home"
          unstable_viewTransition
        >
          <i className="fa-solid fa-mobile-screen-button" />
          <span>GADGETS</span>
        </Link>

        <nav
          className={`${styles.nav} ${isSearchFocused ? styles.navSearchFocused : ''}`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
            unstable_viewTransition
          >
            {({ isActive }) => (
              <>
                {t('header.home')}
                {isActive && <span className={styles.activeIndicator} />}
              </>
            )}
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
            unstable_viewTransition
          >
            {({ isActive }) => (
              <>
                {t('header.phones')}
                {isActive && <span className={styles.activeIndicator} />}
              </>
            )}
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
            unstable_viewTransition
          >
            {({ isActive }) => (
              <>
                {t('header.tablets')}
                {isActive && <span className={styles.activeIndicator} />}
              </>
            )}
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
            unstable_viewTransition
          >
            {({ isActive }) => (
              <>
                {t('header.accessories')}
                {isActive && <span className={styles.activeIndicator} />}
              </>
            )}
          </NavLink>
        </nav>

        <div className={styles.actions}>
          {showSearch && (
            <div
              className={`${styles.searchContainer} ${isSearchFocused ? styles.searchContainerFocused : ''}`}
            >
              <input
                type="search"
                value={localQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onChange={handleSearchChange}
                placeholder={t('header.searchPlaceholder', {
                  category: t(`categories.${pathname.slice(1)}`),
                })}
                className={styles.searchInput}
                aria-label="Search items"
              />
              <i
                className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className={styles.clearButton}
                  aria-label="Clear search query"
                >
                  <i className="fa-solid fa-circle-xmark" />
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className={styles.themeBtn}
            aria-label={
              theme === 'light'
                ? t('header.switchToDark')
                : t('header.switchToLight')
            }
          >
            {theme === 'light' ? (
              <i className="fa-solid fa-moon" />
            ) : (
              <i className="fa-solid fa-sun" />
            )}
          </button>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.iconLink} ${isActive ? styles.iconLinkActive : ''}`
            }
            aria-label={t('header.favoritesAria')}
            unstable_viewTransition
          >
            {({ isActive }) => (
              <>
                <i className="fa-regular fa-heart" />
                {favorites.length > 0 && (
                  <span className={styles.badge}>{favorites.length}</span>
                )}
                {isActive && <span className={styles.activeIndicator} />}
              </>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.iconLink} ${isActive ? styles.iconLinkActive : ''}`
            }
            aria-label={t('header.cartAria')}
            unstable_viewTransition
          >
            {({ isActive }) => (
              <>
                <i className="fa-solid fa-bag-shopping" />
                {totalQuantity > 0 && (
                  <span className={styles.badge}>{totalQuantity}</span>
                )}
                {isActive && <span className={styles.activeIndicator} />}
              </>
            )}
          </NavLink>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={styles.hamburger}
            aria-label={
              isMenuOpen ? t('header.menuClose') : t('header.menuOpen')
            }
          >
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark" />
            ) : (
              <i className="fa-solid fa-bars" />
            )}
          </button>
        </div>
      </header>

      <div
        className={`${styles.menuOverlay} ${isMenuOpen ? styles.menuOverlayOpen : ''}`}
      >
        <nav className={styles.menuNav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.menuNavLink} ${isActive ? styles.menuNavLinkActive : ''}`
            }
          >
            {t('header.home')}
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              `${styles.menuNavLink} ${isActive ? styles.menuNavLinkActive : ''}`
            }
          >
            {t('header.phones')}
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              `${styles.menuNavLink} ${isActive ? styles.menuNavLinkActive : ''}`
            }
          >
            {t('header.tablets')}
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              `${styles.menuNavLink} ${isActive ? styles.menuNavLinkActive : ''}`
            }
          >
            {t('header.accessories')}
          </NavLink>
        </nav>

        <div className={styles.menuActions}>
          <button
            type="button"
            onClick={toggleTheme}
            className={styles.menuActionBtn}
            aria-label={
              theme === 'light'
                ? t('header.switchToDark')
                : t('header.switchToLight')
            }
          >
            {theme === 'light' ? (
              <i className="fa-solid fa-moon" />
            ) : (
              <i className="fa-solid fa-sun" />
            )}
          </button>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.menuActionBtn} ${isActive ? styles.menuActionBtnActive : ''}`
            }
            aria-label={t('header.favoritesAria')}
          >
            <i className="fa-regular fa-heart" />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.menuActionBtn} ${isActive ? styles.menuActionBtnActive : ''}`
            }
            aria-label={t('header.cartAria')}
          >
            <i className="fa-solid fa-bag-shopping" />
            {totalQuantity > 0 && (
              <span className={styles.badge}>{totalQuantity}</span>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
};
