import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { ProductCategory } from '../../types/Product';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { TranslationKey, useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { getPublicPath } from '../../utils/getPublicPath';
import styles from './Header.module.scss';

const navLinks = [
  { to: '/', textKey: 'nav.home' },
  { to: '/phones', textKey: 'nav.phones' },
  { to: '/tablets', textKey: 'nav.tablets' },
  { to: '/accessories', textKey: 'nav.accessories' },
] satisfies { to: string; textKey: TranslationKey }[];

const searchPageNames: Record<string, TranslationKey> = {
  '/phones': 'nav.phones',
  '/tablets': 'nav.tablets',
  '/accessories': 'nav.accessories',
  '/favorites': 'nav.favorites',
};

export const Header = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const queryParam = searchParams.get('query') ?? '';
  const [searchValue, setSearchValue] = useState(queryParam);
  const searchValueRef = useRef(queryParam);
  const previousPathnameRef = useRef(location.pathname);
  const { favoritesCount } = useFavorites();
  const { cartCount } = useCart();
  const { language, t, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const routeState = location.state as { category?: ProductCategory } | null;
  const isProductPage = location.pathname.startsWith('/product/');
  const searchPageName = searchPageNames[location.pathname];
  const shouldShowSearch = Boolean(searchPageName);
  const logoPath =
    theme === 'light' ? 'img/icon-logo-white-theme.svg' : 'img/logo.svg';
  const selectTheme = (nextTheme: 'dark' | 'light') => {
    if (theme !== nextTheme) {
      toggleTheme();
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const desktopMedia = window.matchMedia('(min-width: 1200px)');
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    desktopMedia.addEventListener('change', closeMenuOnDesktop);

    return () => {
      desktopMedia.removeEventListener('change', closeMenuOnDesktop);
    };
  }, []);

  useEffect(() => {
    const pathnameChanged = previousPathnameRef.current !== location.pathname;

    previousPathnameRef.current = location.pathname;

    if (pathnameChanged || searchValueRef.current.trim() !== queryParam) {
      searchValueRef.current = queryParam;
      setSearchValue(queryParam);
    }
  }, [location.pathname, queryParam]);

  useEffect(() => {
    if (!shouldShowSearch) {
      return undefined;
    }

    const normalizedQuery = searchValue.trim();

    if (normalizedQuery === queryParam) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      const nextParams = new URLSearchParams(location.search);

      if (normalizedQuery) {
        nextParams.set('query', normalizedQuery);
      } else {
        nextParams.delete('query');
      }

      nextParams.delete('page');
      setSearchParams(nextParams, { replace: true });
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [
    location.search,
    queryParam,
    searchValue,
    setSearchParams,
    shouldShowSearch,
  ]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            <img
              src={getPublicPath(logoPath)}
              alt={t('header.logoAlt')}
              className={styles.logoImg}
            />
          </Link>

          <nav className={styles.nav} aria-label={t('header.navigation')}>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(styles.navLink, {
                    [styles.isActive]:
                      isActive ||
                      (isProductPage && link.to === `/${routeState?.category}`),
                  })
                }
              >
                {t(link.textKey)}
              </NavLink>
            ))}
          </nav>
        </div>

        {shouldShowSearch && (
          <div className={styles.searchContainer} role="search">
            <img
              src={getPublicPath('img/icon-search.svg')}
              alt=""
              aria-hidden="true"
              className={styles.searchIcon}
            />
            {!searchValue && (
              <span
                className={styles.mobileSearchPlaceholder}
                aria-hidden="true"
              >
                {t('header.searchShort')}
              </span>
            )}
            <input
              type="search"
              className={styles.searchInput}
              value={searchValue}
              placeholder={t('header.search', {
                section: t(searchPageName),
              })}
              aria-label={t('header.searchLabel', {
                section: t(searchPageName),
              })}
              onChange={event => {
                searchValueRef.current = event.target.value;
                setSearchValue(event.target.value);
              }}
            />
          </div>
        )}

        <div className={styles.right}>
          <div
            className={styles.themeSwitcher}
            role="group"
            aria-label={t('header.theme')}
          >
            <button
              type="button"
              className={cn(styles.themeOption, {
                [styles.themeOptionActive]: theme === 'dark',
              })}
              aria-pressed={theme === 'dark'}
              onClick={() => selectTheme('dark')}
            >
              {t('header.dark')}
            </button>
            <span className={styles.themeSeparator} aria-hidden="true">
              |
            </span>
            <button
              type="button"
              className={cn(styles.themeOption, {
                [styles.themeOptionActive]: theme === 'light',
              })}
              aria-pressed={theme === 'light'}
              onClick={() => selectTheme('light')}
            >
              {t('header.light')}
            </button>
          </div>

          <button
            type="button"
            className={styles.languageButton}
            aria-label={t('header.language')}
            title={t('header.language')}
            onClick={toggleLanguage}
          >
            {language === 'en' ? 'UA' : 'EN'}
          </button>

          <NavLink
            to="/favorites"
            aria-label={t('nav.favorites')}
            className={({ isActive }) =>
              cn(styles.iconContainer, { [styles.isActive]: isActive })
            }
          >
            <span className={styles.iconWrapper}>
              <img
                src={getPublicPath('img/heart.svg')}
                alt=""
                aria-hidden="true"
                className={styles.icon}
              />

              {favoritesCount > 0 && (
                <>
                  <span className={styles.counter} aria-hidden="true" />
                  <span className={styles.counterValue}>{favoritesCount}</span>
                </>
              )}
            </span>
          </NavLink>

          <NavLink
            to="/cart"
            aria-label={t('nav.cart')}
            className={({ isActive }) =>
              cn(styles.iconContainer, { [styles.isActive]: isActive })
            }
          >
            <span className={styles.iconWrapper}>
              <img
                src={getPublicPath('img/cart.svg')}
                alt=""
                aria-hidden="true"
                className={styles.icon}
              />

              {cartCount > 0 && (
                <>
                  <span className={styles.counter} aria-hidden="true" />
                  <span className={styles.counterValue}>{cartCount}</span>
                </>
              )}
            </span>
          </NavLink>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={t('header.openMenu')}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <img
            src={getPublicPath('img/icon-menu.svg')}
            alt=""
            aria-hidden="true"
            className={styles.menuIcon}
          />
        </button>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <div className={styles.mobileMenuHeader}>
            <Link
              to="/"
              className={styles.mobileMenuLogo}
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src={getPublicPath(logoPath)}
                alt={t('header.logoAlt')}
                className={styles.mobileMenuLogoImg}
              />
            </Link>

            <button
              type="button"
              className={styles.closeButton}
              aria-label={t('header.closeMenu')}
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src={getPublicPath('img/icon-close.svg')}
                alt=""
                aria-hidden="true"
                className={styles.closeIcon}
              />
            </button>
          </div>

          <nav
            className={styles.mobileNav}
            aria-label={t('header.mobileNavigation')}
          >
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(styles.mobileNavLink, {
                    [styles.mobileNavLinkActive]:
                      isActive ||
                      (isProductPage && link.to === `/${routeState?.category}`),
                  })
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {t(link.textKey)}
              </NavLink>
            ))}

            <button
              type="button"
              className={styles.mobileLanguageButton}
              aria-label={t('header.language')}
              onClick={toggleLanguage}
            >
              {language === 'en' ? 'Українська' : 'English'}
            </button>

            <div className={styles.mobileThemeRow}>
              <span className={styles.mobileThemeLabel}>
                {t('header.theme')}:
              </span>
              <div
                className={cn(styles.themeSwitcher, styles.mobileThemeSwitcher)}
                role="group"
                aria-label={t('header.theme')}
              >
                <button
                  type="button"
                  className={cn(styles.themeOption, {
                    [styles.themeOptionActive]: theme === 'dark',
                  })}
                  aria-pressed={theme === 'dark'}
                  onClick={() => selectTheme('dark')}
                >
                  {t('header.dark')}
                </button>
                <span className={styles.themeSeparator} aria-hidden="true">
                  |
                </span>
                <button
                  type="button"
                  className={cn(styles.themeOption, {
                    [styles.themeOptionActive]: theme === 'light',
                  })}
                  aria-pressed={theme === 'light'}
                  onClick={() => selectTheme('light')}
                >
                  {t('header.light')}
                </button>
              </div>
            </div>
          </nav>

          <div className={styles.mobileActions}>
            <NavLink
              to="/favorites"
              aria-label={t('nav.favorites')}
              className={({ isActive }) =>
                cn(styles.mobileAction, {
                  [styles.mobileActionActive]: isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.iconWrapper}>
                <img
                  src={getPublicPath('img/heart.svg')}
                  alt=""
                  className={styles.icon}
                />

                {favoritesCount > 0 && (
                  <>
                    <span className={styles.counter} aria-hidden="true" />
                    <span className={styles.counterValue}>
                      {favoritesCount}
                    </span>
                  </>
                )}
              </span>
            </NavLink>

            <NavLink
              to="/cart"
              aria-label={t('nav.cart')}
              className={({ isActive }) =>
                cn(styles.mobileAction, {
                  [styles.mobileActionActive]: isActive,
                })
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.iconWrapper}>
                <img
                  src={getPublicPath('img/cart.svg')}
                  alt=""
                  className={styles.icon}
                />

                {cartCount > 0 && (
                  <>
                    <span className={styles.counter} aria-hidden="true" />
                    <span className={styles.counterValue}>{cartCount}</span>
                  </>
                )}
              </span>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
