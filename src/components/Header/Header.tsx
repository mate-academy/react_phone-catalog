/* eslint-disable max-len */
import classNames from 'classnames';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import logo from '../../assets/icons/Logo.svg';
import { useShop } from '../../context/ShopContext';

import styles from './Header.module.scss';

const CART_ANIMATION_DURATION = 500;
const FAVORITES_ANIMATION_DURATION = 500;
const SEARCH_DEBOUNCE_DELAY = 400;

const PRODUCTS_PATHS = ['/phones', '/tablets', '/accessories'];

export const Header = () => {
  const { cart, favorites } = useShop();

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartPopping, setIsCartPopping] = useState(false);
  const [isFavoritesPopping, setIsFavoritesPopping] = useState(false);
  const [searchValue, setSearchValue] = useState(
    searchParams.get('query') || '',
  );

  const cartAnimationTimeoutRef = useRef<number | null>(null);
  const favoritesAnimationTimeoutRef = useRef<number | null>(null);

  const previousCartItemsCountRef = useRef(0);
  const previousFavoritesCountRef = useRef(0);

  const isProductsPage = PRODUCTS_PATHS.includes(location.pathname);

  const queryFromUrl = searchParams.get('query') || '';

  const cartItemsCount = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  useEffect(() => {
    setSearchValue(queryFromUrl);
  }, [location.pathname, queryFromUrl]);

  useEffect(() => {
    if (!isProductsPage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      const preparedQuery = searchValue.trim();

      if (preparedQuery === queryFromUrl) {
        return;
      }

      const nextSearchParams = new URLSearchParams(searchParams);

      if (preparedQuery) {
        nextSearchParams.set('query', preparedQuery);
      } else {
        nextSearchParams.delete('query');
      }

      nextSearchParams.delete('page');

      setSearchParams(nextSearchParams, {
        replace: true,
      });
    }, SEARCH_DEBOUNCE_DELAY);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    isProductsPage,
    queryFromUrl,
    searchParams,
    searchValue,
    setSearchParams,
  ]);

  useEffect(() => {
    const previousCount = previousCartItemsCountRef.current;

    if (cartItemsCount > previousCount) {
      if (cartAnimationTimeoutRef.current !== null) {
        window.clearTimeout(cartAnimationTimeoutRef.current);
      }

      setIsCartPopping(false);

      window.requestAnimationFrame(() => {
        setIsCartPopping(true);
      });

      cartAnimationTimeoutRef.current = window.setTimeout(() => {
        setIsCartPopping(false);
        cartAnimationTimeoutRef.current = null;
      }, CART_ANIMATION_DURATION);
    }

    previousCartItemsCountRef.current = cartItemsCount;
  }, [cartItemsCount]);

  useEffect(() => {
    const previousCount = previousFavoritesCountRef.current;

    if (favorites.length > previousCount) {
      if (favoritesAnimationTimeoutRef.current !== null) {
        window.clearTimeout(favoritesAnimationTimeoutRef.current);
      }

      setIsFavoritesPopping(false);

      window.requestAnimationFrame(() => {
        setIsFavoritesPopping(true);
      });

      favoritesAnimationTimeoutRef.current = window.setTimeout(() => {
        setIsFavoritesPopping(false);
        favoritesAnimationTimeoutRef.current = null;
      }, FAVORITES_ANIMATION_DURATION);
    }

    previousFavoritesCountRef.current = favorites.length;
  }, [favorites.length]);

  useEffect(() => {
    return () => {
      if (cartAnimationTimeoutRef.current !== null) {
        window.clearTimeout(cartAnimationTimeoutRef.current);
      }

      if (favoritesAnimationTimeoutRef.current !== null) {
        window.clearTimeout(favoritesAnimationTimeoutRef.current);
      }
    };
  }, []);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.navLink, {
      [styles.navLinkActive]: isActive,
    });
  };

  const getFavoritesActionClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.actionLink, {
      [styles.actionLinkActive]: isActive,
      [styles.favoritePop]: isFavoritesPopping,
    });
  };

  const getCartActionClass = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.actionLink, {
      [styles.actionLinkActive]: isActive,
      [styles.cartPop]: isCartPopping,
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const clearSearch = () => {
    setSearchValue('');

    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.delete('query');
    nextSearchParams.delete('page');

    setSearchParams(nextSearchParams, {
      replace: true,
    });
  };

  return (
    <>
      <div className={styles.headerShell}>
        <header
          className={classNames(styles.header, {
            [styles.headerWithSearch]: isProductsPage,
          })}
        >
          <NavLink
            to="/"
            className={styles.logoLink}
            onClick={closeMenu}
            aria-label="Nice Gadgets home"
          >
            <img src={logo} alt="Nice Gadgets" className={styles.logo} />
          </NavLink>

          <nav className={styles.nav}>
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>

            <NavLink to="/phones" className={getNavLinkClass}>
              Phones
            </NavLink>

            <NavLink to="/tablets" className={getNavLinkClass}>
              Tablets
            </NavLink>

            <NavLink to="/accessories" className={getNavLinkClass}>
              Accessories
            </NavLink>
          </nav>

          {isProductsPage && (
            <div className={styles.desktopSearch}>
              <label className={styles.searchField}>
                <span className={styles.visuallyHidden}>Search products</span>

                <input
                  type="search"
                  value={searchValue}
                  className={styles.searchInput}
                  placeholder="Search..."
                  onChange={handleSearchChange}
                />

                {searchValue && (
                  <button
                    type="button"
                    className={styles.clearSearch}
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </label>
            </div>
          )}

          <div className={styles.actions}>
            <NavLink
              to="/favorites"
              className={getFavoritesActionClass}
              aria-label="Favorites"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className={styles.icon}
              >
                <path
                  d="M8 13.25 2.47 7.72A3.33 3.33 0 0 1 7.18 3L8 3.82 8.82 3a3.33 3.33 0 0 1 4.71 4.72L8 13.25Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>

              {favorites.length > 0 && (
                <span className={styles.counter}>{favorites.length}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={getCartActionClass}
              aria-label="Cart"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className={styles.icon}
              >
                <path
                  d="M3.5 5.5h9l-.65 7h-7.7l-.65-7Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />

                <path
                  d="M6 5.5V4a2 2 0 0 1 4 0v1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>

              {cartItemsCount > 0 && (
                <span className={styles.counter}>{cartItemsCount}</span>
              )}
            </NavLink>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => {
              setIsMenuOpen(current => !current);
            }}
          >
            {isMenuOpen ? (
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className={styles.icon}
              >
                <path
                  d="m4 4 8 8M12 4l-8 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className={styles.icon}
              >
                <path
                  d="M3 5h10M3 8h10M3 11h10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </header>

        {isProductsPage && (
          <div className={styles.mobileSearch}>
            <label className={styles.searchField}>
              <span className={styles.visuallyHidden}>Search products</span>

              <input
                type="search"
                value={searchValue}
                className={styles.searchInput}
                placeholder="Search..."
                onChange={handleSearchChange}
              />

              {searchValue && (
                <button
                  type="button"
                  className={styles.clearSearch}
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div
          className={classNames(styles.mobileMenu, {
            [styles.mobileMenuWithSearch]: isProductsPage,
          })}
        >
          <nav className={styles.mobileNav}>
            <NavLink to="/" className={getNavLinkClass} onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink
              to="/phones"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              Phones
            </NavLink>

            <NavLink
              to="/tablets"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              Tablets
            </NavLink>

            <NavLink
              to="/accessories"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              Accessories
            </NavLink>
          </nav>

          <div className={styles.mobileActions}>
            <NavLink
              to="/favorites"
              className={classNames(styles.mobileAction, {
                [styles.favoritePop]: isFavoritesPopping,
              })}
              onClick={closeMenu}
              aria-label="Favorites"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className={styles.icon}
              >
                <path
                  d="M8 13.25 2.47 7.72A3.33 3.33 0 0 1 7.18 3L8 3.82 8.82 3a3.33 3.33 0 0 1 4.71 4.72L8 13.25Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>

              {favorites.length > 0 && (
                <span className={styles.counter}>{favorites.length}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={classNames(styles.mobileAction, {
                [styles.cartPop]: isCartPopping,
              })}
              onClick={closeMenu}
              aria-label="Cart"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className={styles.icon}
              >
                <path
                  d="M3.5 5.5h9l-.65 7h-7.7l-.65-7Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />

                <path
                  d="M6 5.5V4a2 2 0 0 1 4 0v1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>

              {cartItemsCount > 0 && (
                <span className={styles.counter}>{cartItemsCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
