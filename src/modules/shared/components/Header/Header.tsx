import styles from './Header.module.scss';

import { useContext, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { NavLinks } from '../NavLinks';
import { LogoHeader } from '../LogoHeader';
import { Container } from '../Container';
import { IconLink } from '../IconLink';
import { FavoritesContext } from '../../_store/FavoritesProvider';
import { CartContext } from '../../_store/CartProvider';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { CartIcon, Favourites } from '../../_constants/icons';
import { getSearchWith } from '../../../../_utils/getSearchWith';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [showSearch, setShowSearch] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const { favorites } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);

  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        setSearchParams(
          getSearchWith({ query: query.trim().toLowerCase() }, searchParams),
        );
      } else {
        setSearchParams(getSearchWith({ query: null }, searchParams));
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setQuery('');
    const checkProductList = () => {
      setShowSearch(!!document.querySelector('#product-list'));
    };

    checkProductList();
    const observer = new MutationObserver(checkProductList);

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <header
      className={classNames(styles.header, {
        [styles['header--menu-open']]: isMenuOpen,
      })}
    >
      <div className={styles.header__top}>
        <LogoHeader isMenuOpen={isMenuOpen} />
        <nav className={styles.header__nav}>
          <ul className={styles.header__navList}>
            <NavLinks />
          </ul>
        </nav>

        {showSearch && (
          <input
            type="search"
            placeholder="Search products..."
            value={query}
            onInput={handleSearchInput}
            className={styles.header__searchInput}
          />
        )}

        <div className={styles.header__icons}>
          <ThemeSwitcher />
          <IconLink modificator="favourites" count={favorites.length} />
          <IconLink modificator="cart" count={totalAmount} />
        </div>
        <div
          className={`${styles.header__icons} ${styles['header__icons--mobile']}`}
        >
          <ThemeSwitcher />
          {isMenuOpen ? (
            <IconLink modificator={'close'} onClick={toggleMenu} />
          ) : (
            <IconLink modificator={'menu'} onClick={toggleMenu} />
          )}
        </div>
      </div>
      {isMenuOpen && (
        <aside className={styles.header__menu}>
          <Container>
            <ul className={styles['header__menu-list']}>
              <NavLinks />
            </ul>
          </Container>
          <div className={styles['header__menu-indicators']}>
            <NavLink
              to="favourites"
              className={({ isActive }) =>
                classNames(
                  styles['header__menu-indicator'],
                  styles['header__menu-indicator--favourites'],
                  {
                    [styles['header__menu-indicator--active']]: isActive,
                  },
                )
              }
            >
              <Favourites />
            </NavLink>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                classNames(
                  styles['header__menu-indicator'],

                  {
                    [styles['header__menu-indicator--active']]: isActive,
                  },
                )
              }
            >
              <CartIcon />
            </NavLink>
          </div>
        </aside>
      )}
    </header>
  );
};
