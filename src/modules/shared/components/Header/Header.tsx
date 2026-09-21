import React from 'react';
import { NavLink, Link, useLocation, useSearchParams } from 'react-router-dom';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';
import styles from './Header.module.scss';
import logoSrc from '/img/Logo.svg';

export const Header: React.FC = () => {
  const { totalCount } = useCart();
  const { favorites } = useFavorites();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isSearchVisible = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favorites',
  ].includes(location.pathname);

  const query = searchParams.get('query') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextParams = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value.trim()) {
      nextParams.set('query', value);
    } else {
      nextParams.delete('query');
    }

    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link to="/" className={styles.logo}>
          <img src={logoSrc} alt="Nice Gadgets" />
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/" className={getLinkClass}>
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

      <div className={styles.right}>
        {isSearchVisible && (
          <div className={styles.searchBox}>
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder={`Search in ${location.pathname.slice(1)}...`}
              className={styles.searchInput}
            />
          </div>
        )}

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.actionBtn} ${isActive ? styles.actionBtnActive : ''}`
            }
          >
            <div className={styles.iconWrapper}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d={
                    'M7.9996 2.72314' +
                    'C6.18365 1.05318 3.32766 1.13524 1.60741 2.85549' +
                    'C-0.150244 4.61315 -0.150244 7.46271 1.60741 9.22037' +
                    'L7.9996 15.6126' +
                    'L14.3918 9.22037' +
                    'C16.1495 7.46271 16.1495 4.61315 14.3918 2.85549' +
                    'C12.6715 1.13524 9.81555 1.05318 7.9996 2.72314Z' +
                    'M2.55022 3.7983' +
                    'C3.79978 2.54874 5.82914 2.54874 7.0787 3.7983' +
                    'L7.9996 4.7192' +
                    'L8.92051 3.7983' +
                    'C10.1701 2.54874 12.1994 2.54874 13.449 3.7983' +
                    'C14.6985 5.04786 14.6985 7.07722 13.449 8.32678' +
                    'L7.9996 13.7762' +
                    'L2.55022 8.32678' +
                    'C1.30066 7.07722 1.30066 5.04786 2.55022 3.7983Z'
                  }
                  fill="#0F0F11"
                />
              </svg>
              {favorites.length > 0 && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.actionBtn} ${isActive ? styles.actionBtnActive : ''}`
            }
          >
            <div className={styles.iconWrapper}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d={
                    'M14.6667 4.66667H11.3333' +
                    'C11.3333 2.82572 9.84095 1.33333 8 1.33333' +
                    'C6.15905 1.33333 4.66667 2.82572 4.66667 4.66667' +
                    'H1.33333' +
                    'C0.965144 4.66667 0.666667 4.96514 0.666667 5.33333' +
                    'V14' +
                    'C0.666667 14.3682 0.965144 14.6667 1.33333 14.6667' +
                    'H14.6667' +
                    'C15.0349 14.6667 15.3333 14.3682 15.3333 14' +
                    'V5.33333' +
                    'C15.3333 4.96514 15.0349 4.66667 14.6667 4.66667Z' +
                    'M8 2.66667' +
                    'C9.10457 2.66667 10 3.5621 10 4.66667' +
                    'H6' +
                    'C6 3.5621 6.89543 2.66667 8 2.66667Z' +
                    'M2 6H4.66667' +
                    'V7.33333' +
                    'C4.66667 7.70152 4.96514 8 5.33333 8' +
                    'C5.70152 8 6 7.70152 6 7.33333' +
                    'V6H10' +
                    'V7.33333' +
                    'C10 7.70152 10.2985 8 10.6667 8' +
                    'C11.0349 8 11.3333 7.70152 11.3333 7.33333' +
                    'V6H14' +
                    'V13.3333H2V6Z'
                  }
                  fill="#0F0F11"
                />
              </svg>
              {totalCount > 0 && (
                <span className={styles.badge}>{totalCount}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
