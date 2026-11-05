import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { ROUTES } from '@/app/router';
import { routePaths } from '@/app/router/routes';

import {
  CartIcon,
  CloseIcon,
  FavouritesIcon,
  Logo,
  MenuIcon,
} from '@/components/atoms';
import {
  CurrencySwitcher,
  LanguageSwitcher,
  ThemeSwitcher,
} from '@/components/molecules';

import { selectCartCount, useCartStore } from '@/entities/cart';
import { useFavouritesStore } from '@/entities/favourites';

import { SearchField } from '../SearchField';

import styles from './Header.module.scss';

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { t } = useTranslation();
  const location = useLocation();

  const cartQuantity = useCartStore(selectCartCount);
  const favouritesCount = useFavouritesStore(
    (state) => state.favourites.length,
  );

  const previousFrom = location.state?.from;

  const cartFrom =
    location.pathname === ROUTES.CART && typeof previousFrom === 'string' ?
      previousFrom
    : `${location.pathname}${location.search}`;

  const closeMenu = () => {
    if (menuRef.current?.contains(document.activeElement)) {
      burgerRef.current?.focus({ preventScroll: true });
    }

    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
    }
  };

  useLayoutEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlOverscroll = html.style.overscrollBehavior;
    const previousBodyOverscroll = body.style.overscrollBehavior;

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overscrollBehavior = 'none';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (menuRef.current?.contains(document.activeElement)) {
          burgerRef.current?.focus({ preventScroll: true });
        }

        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      html.style.overscrollBehavior = previousHtmlOverscroll;
      body.style.overscrollBehavior = previousBodyOverscroll;

      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 951px)');

    const handleScreenChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        return;
      }

      if (menuRef.current?.contains(document.activeElement)) {
        burgerRef.current?.blur();
      }

      setIsMenuOpen(false);
    };

    mediaQuery.addEventListener('change', handleScreenChange);

    return () => {
      mediaQuery.removeEventListener('change', handleScreenChange);
    };
  }, []);

  return (
    <>
      {isMenuOpen && (
        <div
          className={styles.headerPlaceholder}
          aria-hidden="true"
        />
      )}

      <header
        className={classNames(styles.header, className, {
          [styles.menuOpen]: isMenuOpen,
        })}
      >
        <Link
          to={ROUTES.HOME}
          className={styles.logoLink}
          aria-label="Go to home page"
          onClick={closeMenu}
        >
          <Logo size="small" />
        </Link>

        <div className={styles.desktopContent}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {[
                ROUTES.HOME,
                routePaths.catalog('phones'),
                routePaths.catalog('tablets'),
                routePaths.catalog('accessories'),
              ].map((path, idx) => {
                const labels = [
                  t('home'),
                  t('phones'),
                  t('tablets'),
                  t('accessories'),
                ];

                return (
                  <li
                    key={path}
                    className={styles.navItem}
                  >
                    <NavLink
                      to={path}
                      end={path === '/'}
                      className={({ isActive }) =>
                        classNames(styles.navLink, {
                          [styles.active]: isActive,
                        })
                      }
                    >
                      {labels[idx]}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.headerActions}>
            <SearchField className={styles.headerSearch} />

            <div className={styles.headerControls}>
              <LanguageSwitcher />
              <ThemeSwitcher />

              <NavLink
                to={ROUTES.FAVOURITES}
                data-fly-target="favourites"
                aria-label="Open favourites"
                className={({ isActive }) =>
                  classNames(styles.actionBtn, {
                    [styles.active]: isActive,
                  })
                }
              >
                <FavouritesIcon quantity={favouritesCount} />
              </NavLink>

              <NavLink
                to={ROUTES.CART}
                data-fly-target="cart"
                aria-label="Open cart"
                state={{ from: cartFrom }}
                className={({ isActive }) =>
                  classNames(styles.actionBtn, {
                    [styles.active]: isActive,
                  })
                }
              >
                <CartIcon quantity={cartQuantity} />
              </NavLink>
            </div>
          </div>
        </div>

        <button
          ref={burgerRef}
          type="button"
          className={styles.burgerBtn}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="header-mobile-menu"
        >
          {isMenuOpen ?
            <CloseIcon />
          : <MenuIcon />}
        </button>

        <div
          ref={menuRef}
          id="header-mobile-menu"
          className={classNames(styles.mobileMenu, {
            [styles.open]: isMenuOpen,
          })}
          inert={!isMenuOpen}
        >
          <ul className={styles.mobileNavList}>
            {[
              ROUTES.HOME,
              routePaths.catalog('phones'),
              routePaths.catalog('tablets'),
              routePaths.catalog('accessories'),
            ].map((path, idx) => {
              const labels = [
                t('home'),
                t('phones'),
                t('tablets'),
                t('accessories'),
              ];

              return (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={closeMenu}
                    end={path === '/'}
                    className={({ isActive }) =>
                      classNames(styles.mobileNavLink, {
                        [styles.active]: isActive,
                      })
                    }
                  >
                    {labels[idx]}
                  </NavLink>
                </li>
              );
            })}

            <li className={styles.mobileSettings}>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </li>
          </ul>

          <div className={styles.mobileCurrency}>
            <CurrencySwitcher />
          </div>

          <div className={styles.mobileActions}>
            <NavLink
              to={ROUTES.FAVOURITES}
              data-fly-target="favourites"
              aria-label="Open favourites"
              onClick={closeMenu}
              className={({ isActive }) =>
                classNames(styles.mobileActionBtn, {
                  [styles.active]: isActive,
                })
              }
            >
              <FavouritesIcon quantity={favouritesCount} />
            </NavLink>

            <NavLink
              to={ROUTES.CART}
              data-fly-target="cart"
              aria-label="Open cart"
              state={{ from: cartFrom }}
              onClick={closeMenu}
              className={({ isActive }) =>
                classNames(styles.mobileActionBtn, {
                  [styles.active]: isActive,
                })
              }
            >
              <CartIcon quantity={cartQuantity} />
            </NavLink>
          </div>
        </div>
      </header>
    </>
  );
};
