/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useRef, useCallback } from 'react';
import { NavLink, Link, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { ThemeToggle } from '../ThemeToggle';
import styles from './Header.module.scss';

const DEBOUNCE_DELAY = 300;

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.nav__link, {
    [styles['nav__link--active']]: isActive,
  });

const getMobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.mobileMenu__link, {
    [styles['mobileMenu__link--active']]: isActive,
  });

export const Header = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchPages = ['/phones', '/tablets', '/accessories', '/favorites'];
  const showSearch = searchPages.includes(location.pathname);

  const currentQuery = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(currentQuery);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchIconClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    setInputValue(currentQuery);
  }, [currentQuery]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const applySearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value.trim()) {
        params.set('query', value.trim());
      } else {
        params.delete('query');
      }

      params.set('page', '1');
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      applySearch(value);
    }, DEBOUNCE_DELAY);
  };

  const handleClearSearch = () => {
    setInputValue('');
    applySearch('');
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__icon, {
      [styles['header__icon--active']]: isActive,
    });

  const getMobileIconClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.mobileMenu__icon, {
      [styles['mobileMenu__icon--active']]: isActive,
    });

  const pageName = location.pathname.slice(1) || 'products';

  return (
    <>
      <header className={styles.header} id="top">
        <div className={styles.header__left}>
          <Link to="/" className={styles.header__logo}>
            <div className={styles.header__logoContainer}>
              <img
                src="img/icons/logo.svg"
                alt="Nice Gadgets"
                className={styles.header__logoText}
              />
              <img
                src="img/icons/logo-flame.png"
                alt=""
                className={styles.header__logoFlame}
              />
            </div>
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <NavLink to="/" className={getLinkClass}>
                  Home
                </NavLink>
              </li>

              <li className={styles.nav__item}>
                <NavLink to="/phones" className={getLinkClass}>
                  Phones
                </NavLink>
              </li>

              <li className={styles.nav__item}>
                <NavLink to="/tablets" className={getLinkClass}>
                  Tablets
                </NavLink>
              </li>

              <li className={styles.nav__item}>
                <NavLink to="/accessories" className={getLinkClass}>
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.header__right}>
          {/* {showSearch && (
            <div className={styles.header__search}>
              <button
                type="button"
                className={styles.header__searchBtn}
                onClick={handleSearchIconClick}
                aria-label="Focus search"
              >
                <img
                  src="img/icons/search.svg"
                  alt="Search"
                  className={styles.header__searchIcon}
                />
              </button>
              <input
                ref={inputRef}
                type="text"
                className={styles.header__searchInput}
                placeholder={`Search in ${pageName}...`}
                value={inputValue}
                onChange={handleSearchChange}
              />
              {inputValue && (
                <button
                  type="button"
                  className={styles.header__searchClear}
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                  data-cy="searchDelete"
                >
                  <img src="img/icons/close.svg" alt="Clear" />
                </button>
              )}
            </div>
          )} */}

          <div className={styles.header__themeToggle}>
            <ThemeToggle />
          </div>

          <NavLink to="/favorites" className={getIconClass}>
            <span className={styles.header__iconWrap}>
              <img src="img/icons/favourites.svg" alt="Favorites" />
              {totalFavorites > 0 && (
                <span className={styles.header__badge}>{totalFavorites}</span>
              )}
            </span>
          </NavLink>

          <NavLink to="/cart" className={getIconClass}>
            <span className={styles.header__iconWrap}>
              <img src="img/icons/cart.svg" alt="Cart" />
              {totalItems > 0 && (
                <span className={styles.header__badge}>{totalItems}</span>
              )}
            </span>
          </NavLink>

          <button
            type="button"
            className={styles.header__burger}
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <span className={styles.header__burgerLine} />
            <span className={styles.header__burgerLine} />
            <span className={styles.header__burgerLine} />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenu__header}>
            <Link
              to="/"
              className={styles.header__logo}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className={styles.header__logoContainer}>
                <img
                  src="img/icons/logo.svg"
                  alt="Nice Gadgets"
                  className={styles.header__logoText}
                />
                <img
                  src="img/icons/logo-flame.png"
                  alt=""
                  className={styles.header__logoFlame}
                />
              </div>
            </Link>

            <button
              type="button"
              className={styles.mobileMenu__close}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <img src="img/icons/close.svg" alt="Close" />
            </button>
          </div>

          <nav className={styles.mobileMenu__nav}>
            <NavLink to="/" className={getMobileLinkClass}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getMobileLinkClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getMobileLinkClass}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getMobileLinkClass}>
              Accessories
            </NavLink>
          </nav>

          <div className={styles.mobileMenu__bottom}>
            <div className={styles.mobileMenu__themeToggle}>
              <ThemeToggle />
            </div>

            <NavLink
              to="/favorites"
              className={getMobileIconClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.mobileMenu__iconWrap}>
                <img src="img/icons/favourites.svg" alt="Favorites" />
                {totalFavorites > 0 && (
                  <span className={styles.header__badge}>{totalFavorites}</span>
                )}
              </span>
            </NavLink>

            <NavLink
              to="/cart"
              className={getMobileIconClass}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.mobileMenu__iconWrap}>
                <img src="img/icons/cart.svg" alt="Cart" />
                {totalItems > 0 && (
                  <span className={styles.header__badge}>{totalItems}</span>
                )}
              </span>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
