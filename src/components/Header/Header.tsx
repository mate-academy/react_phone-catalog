import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { normalizePath } from '../../api/products';
import styles from './Header.module.scss';

const SEARCH_PAGES = ['/phones', '/tablets', '/accessories', '/favorites'];

export const Header: React.FC = () => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const showSearch = SEARCH_PAGES.includes(location.pathname);
  const query = searchParams.get('query') || '';

  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    if (!showSearch) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSearchParams(previous => {
        const next = new URLSearchParams(previous);
        const value = searchValue.trim();

        if (value) {
          next.set('query', value);
        } else {
          next.delete('query');
        }

        next.delete('page');

        return next;
      });
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [searchValue, showSearch, setSearchParams]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navGroup}>
          <Link to="/" className={styles.logoLink}>
            <img
              src={normalizePath('/img/logo.svg')}
              alt="Nice Gadgets Logo"
              className={styles.logo}
            />
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/" end className={getLinkClass}>
              Home
            </NavLink>

            <NavLink to="/phones" className={getLinkClass}>
              Phones
            </NavLink>

            <NavLink to="/tablets" className={getLinkClass}>
              Tablets
            </NavLink>

            <NavLink to="/accessories" className={getLinkClass}>
              Accessories
            </NavLink>
          </nav>
        </div>

        {showSearch && (
          <div className={styles.search}>
            <input
              type="search"
              value={searchValue}
              onChange={event => setSearchValue(event.target.value)}
              placeholder="Search"
              aria-label="Search products"
              className={styles.searchInput}
            />
          </div>
        )}

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.iconBtn} ${styles.iconBtnActive}`
                : styles.iconBtn
            }
            aria-label="Favorites"
          >
            <div className={styles.iconWrapper}>
              <div className={`${styles.icon} ${styles.favIcon}`} />

              {favorites.length > 0 && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.iconBtn} ${styles.iconBtnActive}`
                : styles.iconBtn
            }
            aria-label="Cart"
          >
            <div className={styles.iconWrapper}>
              <div className={`${styles.icon} ${styles.cartIcon}`} />

              {totalQuantity > 0 && (
                <span className={styles.badge}>{totalQuantity}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
