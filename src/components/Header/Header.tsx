import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { selectCartTotalQuantity } from '../../features/cart/cartSlice';
import { selectFavoritesCount } from '../../features/favorites/favoritesSlice';
import { Menu } from './Menu';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';
import { useDebounce } from '../../utils/debounce';

import styles from './Header.module.scss';
import logo from '../../assets/icons/logo.png';
import logoLight from '../../assets/icons/logo-light.png';
import {
  BurgerIcon,
  CartIcon,
  CloseIcon,
  HeartIcon,
  SearchIcon,
} from '../iconsSVG';

const PRODUCT_LIST_PATHS = [
  '/phones',
  '/tablets',
  '/accessories',
  '/favorites',
];
const SEARCH_DEBOUNCE_DELAY = 300;

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useAppSelector(selectCartTotalQuantity);
  const favCount = useAppSelector(selectFavoritesCount);
  const { theme } = useTheme();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const isProductListPage = PRODUCT_LIST_PATHS.includes(location.pathname);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, SEARCH_DEBOUNCE_DELAY);

  const searchPlaceholder = useMemo(() => {
    const category = location.pathname.slice(1);

    return category ? `Search in ${category}...` : 'Search...';
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const clearSearch = () => setSearchValue('');

  useEffect(() => {
    setSearchValue(isProductListPage ? (searchParams.get('query') ?? '') : '');
  }, [isProductListPage, location.pathname, searchParams, searchParamsKey]);

  useEffect(() => {
    if (!isProductListPage) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    const normalizedSearch = debouncedSearchValue.trim();

    if ((params.get('query') ?? '') === normalizedSearch) {
      return;
    }

    if (normalizedSearch) {
      params.set('query', normalizedSearch);
    } else {
      params.delete('query');
    }

    params.delete('page');
    setSearchParams(params, { replace: true });
  }, [debouncedSearchValue, isProductListPage, searchParams, setSearchParams]);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo} aria-label="Home">
          <img src={theme === 'light' ? logoLight : logo} alt="Logo" />
        </Link>

        <nav className={styles.header__nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles.header__link, {
                [styles['header__link--active']]: isActive,
              })
            }
          >
            HOME
          </NavLink>

          <NavLink
            to="/phones"
            className={({ isActive }) =>
              cn(styles.header__link, {
                [styles['header__link--active']]: isActive,
              })
            }
          >
            Phones
          </NavLink>

          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              cn(styles.header__link, {
                [styles['header__link--active']]: isActive,
              })
            }
          >
            Tablets
          </NavLink>

          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              cn(styles.header__link, {
                [styles['header__link--active']]: isActive,
              })
            }
          >
            Accessories
          </NavLink>
        </nav>

        <div className={styles.header__actions}>
          {isProductListPage && (
            <form
              className={styles.header__search}
              role="search"
              onSubmit={event => event.preventDefault()}
            >
              <SearchIcon className={styles.header__searchIcon} />

              <input
                className={styles.header__searchInput}
                type="search"
                value={searchValue}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                onChange={event => setSearchValue(event.target.value)}
              />

              {searchValue && (
                <button
                  type="button"
                  className={styles.header__searchClear}
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <CloseIcon title={null} />
                </button>
              )}
            </form>
          )}

          <div className={styles.header__icons}>
            <div className={styles.header__theme}>
              <ThemeToggle />
            </div>

            <NavLink
              to="/favorites"
              aria-label="Favorites"
              className={({ isActive }) =>
                cn(styles.header__iconBtn, {
                  [styles['header__iconBtn--active']]: isActive,
                })
              }
            >
              <span className={styles.header__iconWrap} aria-hidden="true">
                <HeartIcon className={styles.header__iconSvg} />
              </span>
              {favCount > 0 && (
                <span className={styles.header__badge}>{favCount}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              aria-label="Cart"
              className={({ isActive }) =>
                cn(styles.header__iconBtn, {
                  [styles['header__iconBtn--active']]: isActive,
                })
              }
            >
              <span className={styles.header__iconWrap} aria-hidden="true">
                <CartIcon className={styles.header__iconSvg} />
              </span>
              {cartCount > 0 && (
                <span className={styles.header__badge}>{cartCount}</span>
              )}
            </NavLink>

            <button
              type="button"
              className={styles.header__burger}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <CloseIcon className={styles.header__burgerIcon} />
              ) : (
                <BurgerIcon className={styles.header__burgerIcon} />
              )}
            </button>
          </div>
        </div>
      </div>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
