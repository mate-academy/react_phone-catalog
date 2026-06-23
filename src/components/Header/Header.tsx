import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import logo from './components/img/logo.png';
import menu from './components/img/Menu.png';
import favorites from './components/img/favourites.png';
import bag from './components/img/bag.png';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import searchIcon from './components/img/Search.png';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

  const getActionClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.actionButton} ${styles.actionButtonActive}`
      : styles.actionButton;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { favoriteIds } = useFavorites();
  const { totalQuantity } = useCart();

  const location = useLocation();

  const isCatalogPage =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories' ||
    location.pathname === '/favorites';

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    if (searchValue.trim() === query) {
      return;
    }

    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchValue.trim()) {
        params.set('query', searchValue.trim());
      } else {
        params.delete('query');
      }

      params.delete('page');
      setSearchParams(params);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [searchValue, query, searchParams, setSearchParams]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <img className={styles.logo__image} src={logo} alt="Logo" />
        </NavLink>

        <nav className={styles.nav}>
          <NavLink className={getLinkClass} to="/" end>
            Home
          </NavLink>
          <NavLink className={getLinkClass} to="/phones">
            Phones
          </NavLink>
          <NavLink className={getLinkClass} to="/tablets">
            Tablets
          </NavLink>
          <NavLink className={getLinkClass} to="/accessories">
            Accessories
          </NavLink>
        </nav>

        {isCatalogPage && (
          <div
            className={`${styles.search} ${
              isSearchOpen ? styles.searchOpen : ''
            }`}
          >
            <button
              type="button"
              className={styles.searchButton}
              onClick={() => setIsSearchOpen(prev => !prev)}
            >
              <img
                src={searchIcon}
                alt="search"
                className={styles.searchIcon}
              />
            </button>

            <input
              type="search"
              placeholder="Search..."
              value={searchValue}
              className={styles.searchInput}
              onChange={e => setSearchValue(e.target.value)}
            />
          </div>
        )}

        <div
          className={`${styles.button__left} ${
            !isCatalogPage ? styles.button__leftRight : ''
          }`}
        >
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${getActionClass({ isActive })} ${styles.favorites}`
            }
          >
            <img
              src={favorites}
              alt="favorites"
              className={styles.icon__favorites}
            />

            {favoriteIds.length > 0 && (
              <span className={styles.counter}>{favoriteIds.length}</span>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${getActionClass({ isActive })} ${styles.bag}`
            }
          >
            <img src={bag} alt="bag" className={styles.icon__bag} />

            {totalQuantity > 0 && (
              <span className={styles.counter}>{totalQuantity}</span>
            )}
          </NavLink>
        </div>

        <button
          className={`${styles.burger} ${!isCatalogPage ? styles.burgerRight : ''}`}
          type="button"
          aria-label="Open menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <img src={menu} alt="Menu" className={styles.icon__burger} />
        </button>

        {isMenuOpen && <BurgerMenu onClose={() => setIsMenuOpen(false)} />}
      </div>
    </header>
  );
};
