import { useState, useEffect, useCallback } from 'react';
import { NavLink, Link, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useStore } from '../../context/StoreContext';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './Header.module.scss';

export const Header = () => {
  const { favorites, totalCartQuantity } = useStore();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavorites = favorites.length;

  const showSearch = [
    '/phones',
    '/tablets',
    '/accessories',
    '/favorites',
  ].includes(pathname);

  const queryParam = searchParams.get('query') || '';
  const [appliedQuery, setAppliedQuery] = useState(queryParam);
  const debouncedQuery = useDebounce(appliedQuery, 500);

  const updateQueryInUrl = useCallback(
    (newQuery: string) => {
      const params = new URLSearchParams(searchParams);

      if (newQuery.trim()) {
        params.set('query', newQuery);
      } else {
        params.delete('query');
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    setAppliedQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (debouncedQuery !== queryParam) {
      updateQueryInUrl(debouncedQuery);
    }
  }, [debouncedQuery, queryParam, updateQueryInUrl]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppliedQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setAppliedQuery('');
    updateQueryInUrl('');
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__link, {
      [styles['header__link--active']]: isActive,
    });

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link to="/" className={styles.header__logo}>
            NICE GADGETS
          </Link>

          <nav className={styles.header__nav}>
            <NavLink to="/" className={getLinkClass}>
              HOME
            </NavLink>
            <NavLink to="/phones" className={getLinkClass}>
              PHONES
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass}>
              TABLETS
            </NavLink>
            <NavLink to="/accessories" className={getLinkClass}>
              ACCESSORIES
            </NavLink>
          </nav>
        </div>

        <div className={styles.header__right}>
          {showSearch && (
            <div className={styles.header__search}>
              <input
                type="text"
                className={styles['header__search-input']}
                placeholder={`Search in ${pathname.slice(1)}...`}
                value={appliedQuery}
                onChange={handleSearchChange}
              />
              {appliedQuery && (
                <button
                  className={styles['header__search-clear']}
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          )}

          <div className={styles.header__actions}>
            <NavLink to="/favorites" className={styles.header__icon}>
              <i className="far fa-heart"></i>
              {totalFavorites > 0 && (
                <span className={styles.header__badge}>{totalFavorites}</span>
              )}
            </NavLink>
            <NavLink to="/cart" className={styles.header__icon}>
              <i className="fas fa-shopping-bag"></i>
              {totalCartQuantity > 0 && (
                <span className={styles.header__badge}>
                  {totalCartQuantity}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
