import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';

import styles from './Header.module.scss';
import { NavBar } from '../NavBar/NavBar';
import { useProductsContext } from '../../../../hook/useProductsContext';

const SEARCH_PATHS = ['/phones', '/tablets', '/accessories', '/favorites'];

const DEBOUNCE_DELAY = 500;

export const Header = () => {
  const { cartProducts, favouriteProducts } = useProductsContext();

  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get('query') ?? '';
  const [query, setQuery] = useState(queryFromUrl);
  const [isBurger, setIsBurger] = useState(false);

  const shouldShowSearch = SEARCH_PATHS.includes(pathname);

  const totalCartItems = cartProducts.reduce((total, cartItem) => {
    return total + cartItem.quantity;
  }, 0);

  useEffect(() => {
    setIsBurger(false);
  }, [pathname]);

  useEffect(() => {
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    if (!isBurger) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isBurger]);

  useEffect(() => {
    if (!shouldShowSearch || query === queryFromUrl) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSearchParams(currentParams => {
        const newParams = new URLSearchParams(currentParams);
        const normalizedQuery = query.trim();

        if (normalizedQuery) {
          newParams.set('query', normalizedQuery);
        } else {
          newParams.delete('query');
        }

        newParams.delete('page');

        return newParams;
      });
    }, DEBOUNCE_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [query, queryFromUrl, setSearchParams, shouldShowSearch]);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link to="/" onClick={() => setIsBurger(false)}>
          <img
            src="./img/logo.png"
            alt="Nice Gadgets"
            className={styles['header__logo-img']}
          />
        </Link>
      </div>

      <div className={styles.header__nav}>
        <NavBar />
      </div>

      <div className={styles.header__actions}>
        {shouldShowSearch && (
          <div className={styles.header__search}>
            <input
              type="search"
              value={query}
              placeholder="Search..."
              aria-label="Search products"
              autoComplete="off"
              className={styles['header__search-input']}
              onChange={event => setQuery(event.target.value)}
            />
          </div>
        )}

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.header__action} ${
              isActive ? styles['header__action--active'] : ''
            }`
          }
        >
          <div className={styles['header__action-container']}>
            <img
              src="./img/favourites.png"
              alt="Favorites"
              className={styles['header__action-img']}
            />

            {favouriteProducts.length > 0 && (
              <span className={styles.header__badge}>
                {favouriteProducts.length}
              </span>
            )}
          </div>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles.header__action} ${
              isActive ? styles['header__action--active'] : ''
            }`
          }
        >
          <div className={styles['header__action-container']}>
            <img
              src="./img/cart.png"
              alt="Cart"
              className={styles['header__action-img']}
            />

            {totalCartItems > 0 && (
              <span className={styles.header__badge}>{totalCartItems}</span>
            )}
          </div>
        </NavLink>
      </div>

      <button
        type="button"
        aria-label={isBurger ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isBurger}
        className={styles['header__burger-button']}
        onClick={() => setIsBurger(current => !current)}
      >
        <img
          src={isBurger ? './img/Close.png' : './img/burger.png'}
          alt=""
          className={styles['header__burger-icon']}
        />
      </button>

      {isBurger && (
        <div className={styles.burger__container}>
          <div
            className={styles.burger__nav}
            onClick={() => setIsBurger(false)}
          >
            <NavBar />
          </div>

          <div className={styles.burger__actions}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `${styles.burger__action} ${
                  isActive ? styles['burger__action--active'] : ''
                }`
              }
              onClick={() => setIsBurger(false)}
            >
              <div className={styles['burger__action-container']}>
                <img
                  src="./img/favourites.png"
                  alt="Favorites"
                  className={styles['burger__action-img']}
                />

                {favouriteProducts.length > 0 && (
                  <span className={styles.header__badge}>
                    {favouriteProducts.length}
                  </span>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.burger__action} ${
                  isActive ? styles['burger__action--active'] : ''
                }`
              }
              onClick={() => setIsBurger(false)}
            >
              <div className={styles['burger__action-container']}>
                <img
                  src="./img/cart.png"
                  alt="Cart"
                  className={styles['burger__action-img']}
                />

                {totalCartItems > 0 && (
                  <span className={styles.header__badge}>{totalCartItems}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
