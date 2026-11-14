import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import styles from './Header.module.scss';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Phones', path: '/phones' },
  { label: 'Tablets', path: '/tablets' },
  { label: 'Accessories', path: '/accessories' },
];

const SEARCHABLE_PATHS = ['/phones', '/tablets', '/accessories', '/favorites'];

const CART_PATH_1 = [
  'M3.46683 0.933323C3.59273 0.765453 3.79032 0.666656 4.00016 0.666656',
  'H12.0002C12.21 0.666656 12.4076 0.765453 12.5335 0.933323L14.5335 3.59999',
  'C14.62 3.71539 14.6668 3.85574 14.6668 3.99999V13.3333C14.6668 13.8638',
  '14.4561 14.3725 14.081 14.7475C13.706 15.1226 13.1973 15.3333 12.6668',
  '15.3333H3.3335C2.80306 15.3333 2.29436 15.1226 1.91928 14.7475C1.54421',
  '14.3725 1.3335 13.8638 1.3335 13.3333V3.99999C1.3335 3.85574 1.38028',
  '3.71539 1.46683 3.59999L3.46683 0.933323ZM4.3335 1.99999L2.66683 4.22221',
  'V13.3333C2.66683 13.5101 2.73707 13.6797 2.86209 13.8047C2.98712 13.9298',
  '3.15669 14 3.3335 14H12.6668C12.8436 14 13.0132 13.9298 13.1382 13.8047',
  'C13.2633 13.6797 13.3335 13.5101 13.3335 13.3333V4.22221L11.6668 1.99999',
  'H4.3335Z',
].join(' ');

const CART_PATH_2 = [
  'M1.3335 4.00001C1.3335 3.63182 1.63197 3.33334 2.00016 3.33334H14.0002',
  'C14.3684 3.33334 14.6668 3.63182 14.6668 4.00001C14.6668 4.3682 14.3684',
  '4.66668 14.0002 4.66668H2.00016C1.63197 4.66668 1.3335 4.3682 1.3335',
  '4.00001Z',
].join(' ');

const CART_PATH_3 = [
  'M5.33366 6C5.70185 6 6.00033 6.29848 6.00033 6.66667C6.00033 7.1971',
  '6.21104 7.70581 6.58611 8.08088C6.96118 8.45595 7.46989 8.66667 8.00033',
  '8.66667C8.53076 8.66667 9.03947 8.45595 9.41454 8.08088C9.78961 7.70581',
  '10.0003 7.1971 10.0003 6.66667C10.0003 6.29848 10.2988 6 10.667 6C11.0352',
  '6 11.3337 6.29848 11.3337 6.66667C11.3337 7.55072 10.9825 8.39857 10.3573',
  '9.02369C9.73223 9.64881 8.88438 10 8.00033 10C7.11627 10 6.26842 9.64881',
  '5.6433 9.02369C5.01818 8.39857 4.66699 7.55072 4.66699 6.66667C4.66699',
  '6.29848 4.96547 6 5.33366 6Z',
].join(' ');

const HEART_PATH = [
  'M11.3 2C9.96 2 8.78 2.67 8 3.7C7.22 2.67 6.04 2 4.7 2C2.62 2 1 3.62 1',
  '5.7C1 8.47 4.4 11.36 7.39 13.82C7.75 14.12 8.25 14.12 8.61 13.82C11.6',
  '11.36 15 8.47 15 5.7C15 3.62 13.38 2 11.3 2Z',
].join(' ');

export const Header: React.FC = () => {
  const { favorites, totalCartCount } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const isSearchVisible = SEARCHABLE_PATHS.includes(location.pathname);
  const queryFromUrl = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(queryFromUrl);

  useEffect(() => {
    setSearchValue(queryFromUrl);
    setIsMenuOpen(false);
  }, [location.pathname, queryFromUrl]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isSearchVisible) {
      return undefined;
    }

    const timer = setTimeout(() => {
      const nextParams = new URLSearchParams(searchParams);
      const trimmed = searchValue.trim();

      if (trimmed) {
        nextParams.set('query', trimmed);
        nextParams.delete('page');
      } else {
        nextParams.delete('query');
      }

      if (nextParams.toString() !== searchParams.toString()) {
        setSearchParams(nextParams, { replace: true });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue, isSearchVisible, searchParams, setSearchParams]);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    const active = isActive ? styles['header__navLink--active'] : '';

    return `${styles.header__navLink} ${active}`;
  };

  const getIconLinkClass = ({ isActive }: { isActive: boolean }) => {
    const active = isActive ? styles['header__iconLink--active'] : '';

    return `${styles.header__iconLink} ${active}`;
  };

  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) => {
    const active = isActive ? styles['mobileMenu__link--active'] : '';

    return `${styles.mobileMenu__link} ${active}`;
  };

  const getMobileBottomClass = ({ isActive }: { isActive: boolean }) => {
    const active = isActive ? styles['mobileMenu__bottomLink--active'] : '';

    return `${styles.mobileMenu__bottomLink} ${active}`;
  };

  const renderCartSvg = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={CART_PATH_1}
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#313237"
      />
      <path
        d={CART_PATH_2}
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#313237"
      />
      <path
        d={CART_PATH_3}
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#313237"
      />
    </svg>
  );

  const renderHeartSvg = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d={HEART_PATH} stroke="#313237" strokeWidth="1.3" />
    </svg>
  );

  const mobileMenuClass = [
    styles.mobileMenu,
    isMenuOpen ? styles['mobileMenu--open'] : '',
  ].join(' ');

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <Link to="/" className={styles.header__logoLink}>
            <img
              src={`${import.meta.env.BASE_URL}img/Logo.svg`}
              alt="Nice Gadgets"
              className={styles.header__logo}
            />
          </Link>

          <nav className={styles.header__nav}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={getNavLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.header__right}>
          {isSearchVisible && (
            <div className={styles.header__searchWrapper}>
              <input
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`Search in ${location.pathname.slice(1)}...`}
                className={styles.header__searchInput}
              />
              {searchValue && (
                <button
                  type="button"
                  className={styles.header__clearBtn}
                  onClick={() => setSearchValue('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          <div className={styles.header__actions}>
            <NavLink
              to="/favorites"
              className={getIconLinkClass}
              aria-label="Favorites"
            >
              <div className={styles.header__iconBox}>
                {renderHeartSvg()}
                {favorites.length > 0 && (
                  <span className={styles.header__badge}>
                    {favorites.length}
                  </span>
                )}
              </div>
            </NavLink>

            <NavLink to="/cart" className={getIconLinkClass} aria-label="Cart">
              <div className={styles.header__iconBox}>
                {renderCartSvg()}
                {totalCartCount > 0 && (
                  <span className={styles.header__badge}>{totalCartCount}</span>
                )}
              </div>
            </NavLink>
          </div>

          <button
            type="button"
            className={styles.header__burgerBtn}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <aside className={mobileMenuClass}>
        <nav className={styles.mobileMenu__nav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={getMobileLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.mobileMenu__bottom}>
          <NavLink
            to="/favorites"
            className={getMobileBottomClass}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={styles.header__iconBox}>
              {renderHeartSvg()}
              {favorites.length > 0 && (
                <span className={styles.header__badge}>{favorites.length}</span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={getMobileBottomClass}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={styles.header__iconBox}>
              {renderCartSvg()}
              {totalCartCount > 0 && (
                <span className={styles.header__badge}>{totalCartCount}</span>
              )}
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
