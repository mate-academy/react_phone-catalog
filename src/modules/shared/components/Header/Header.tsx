import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { totalQuantity } = useCart();
  const { favoritesCount } = useFavorites();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isCatalogPage = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favorites',
  ].includes(location.pathname);

  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  // Debounced search query update
  useEffect(() => {
    if (!isCatalogPage) {
      return;
    }

    const timer = setTimeout(() => {
      const currentQuery = searchParams.get('query') || '';

      if (query !== currentQuery) {
        const newParams = new URLSearchParams(searchParams);

        if (query.trim()) {
          newParams.set('query', query.trim());
          newParams.set('page', '1');
        } else {
          newParams.delete('query');
        }

        setSearchParams(newParams);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, isCatalogPage, searchParams, setSearchParams]);

  const getCategoryName = () => {
    if (location.pathname === '/phones') {
      return t('phones').toLowerCase();
    }

    if (location.pathname === '/tablets') {
      return t('tablets').toLowerCase();
    }

    if (location.pathname === '/accessories') {
      return t('accessories').toLowerCase();
    }

    if (location.pathname === '/favorites') {
      return t('favorites').toLowerCase();
    }

    return '';
  };

  return (
    <header className={styles.header} data-cy="appHeader">
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <NavLink to="/" className={styles.logo}>
            NICE<span>GADGETS</span>
          </NavLink>

          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames(styles.navLink, { [styles.activeNavLink]: isActive })
              }
            >
              {t('home')}
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                classNames(styles.navLink, { [styles.activeNavLink]: isActive })
              }
            >
              {t('phones')}
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                classNames(styles.navLink, { [styles.activeNavLink]: isActive })
              }
            >
              {t('tablets')}
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                classNames(styles.navLink, { [styles.activeNavLink]: isActive })
              }
            >
              {t('accessories')}
            </NavLink>
          </nav>
        </div>

        <div className={styles.rightSection}>
          {isCatalogPage && (
            <div className={styles.searchBox}>
              <i className={classNames('fas fa-search', styles.searchIcon)} />
              <input
                type="search"
                className={styles.searchInput}
                placeholder={`${t('searchPlaceholder')} ${getCategoryName()}...`}
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
          )}

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.actionButton, {
                [styles.activeActionButton]: isActive,
              })
            }
            aria-label="Favorites"
          >
            <i className="far fa-heart" />
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.actionButton, {
                [styles.activeActionButton]: isActive,
              })
            }
            aria-label="Cart"
          >
            <i className="fas fa-shopping-bag" />
            {totalQuantity > 0 && (
              <span className={styles.badge}>{totalQuantity}</span>
            )}
          </NavLink>

          <button
            type="button"
            className={styles.langBtn}
            onClick={() => setLanguage(language === 'en' ? 'ua' : 'en')}
            title="Switch language"
          >
            {language.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
};
