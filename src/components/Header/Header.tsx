import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import styles from './Header.module.scss';
import { routes } from '../../router/routes';
import { RootState } from '../../store/store';

import FavoritesHurt from '../../UI/Buttons/Icons/FavouritesHurtAnactive.svg';
import CartHurt from '../../UI/Buttons/Icons/CartHurt.svg';
import Logo from '../../UI/photos/Logo.svg';
import { selectCartTotal } from '../../store/selectors/selectCartTotal';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleMenu = () => setIsOpen(prev => !prev);

  const cart = useSelector((state: RootState) => state.cart.items);
  const favorite = useSelector((state: RootState) => state.favorites.items);

  const total = useSelector(selectCartTotal);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { label: 'HOME', path: routes.home },
    { label: 'PHONES', path: routes.phones },
    { label: 'TABLETS', path: routes.tablets },
    { label: 'ACCESSORIES', path: routes.accessories },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchValue(value);

    // Визначаємо категорію
    const path = location.pathname.includes('catalog')
      ? location.pathname // залишаємо поточний каталог
      : routes.phones; // дефолтно на телефони

    navigate(
      { pathname: path, search: value ? `?query=${value.toLowerCase()}` : '' },
      { replace: true },
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query') || '';

    setSearchValue(query);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <NavLink to={routes.home} className={styles.header__logo_link}>
          <img
            src={Logo}
            alt="Nice Gadgets Logo"
            className={styles.header__logo_img}
          />
        </NavLink>
      </div>

      {/* Desktop navigation */}
      <nav className={styles.header__nav_desktop}>
        <ul className={styles.header__nav_list}>
          {navItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/*Search Bar */}
      {location.pathname.includes('catalog') ? (
        <div className={styles.header__search_desktop}>
          <input
            type="search"
            placeholder="Search"
            value={searchValue}
            className={styles.header__search_desktop_input}
            onChange={e => handleChange(e)}
          />
        </div>
      ) : null}

      {/* Desktop cart & favorites */}
      <div className={styles.header__actions_desktop}>
        <NavLink
          to={routes.favorites}
          className={({ isActive }) => (isActive ? styles.activeActions : '')}
        >
          <img
            src={FavoritesHurt}
            alt="Favorites"
            className={styles.header__actions_desktop_img}
          />
          {favorite.length > 0 && (
            <span className={styles.badge}>{favorite.length}</span>
          )}
        </NavLink>
        <NavLink
          to={routes.cart}
          className={({ isActive }) => (isActive ? styles.activeActions : '')}
        >
          <img
            src={CartHurt}
            alt="Cart"
            className={styles.header__actions_desktop_img}
          />
          {cart.length > 0 && <span className={styles.badge}>{total}</span>}
        </NavLink>
      </div>

      {/* Burger button */}
      <button
        className={`${styles.header__burger} ${
          isOpen ? styles.header__burger_open : ''
        }`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Fullscreen mobile menu */}
      <div
        className={`${styles.header__menuOverlay} ${
          isOpen ? styles.header__menuOverlay_open : ''
        }`}
      >
        <nav className={styles.header__nav_mobile}>
          <ul className={styles.header__nav_list_mobile}>
            {navItems.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={toggleMenu}
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile cart at bottom */}
        <div className={styles.header__actions_mobile}>
          <NavLink
            to="/favorites"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.activeActions : '')}
          >
            <img src={FavoritesHurt} alt="Favorites" />
          </NavLink>
          <NavLink
            to="/cart"
            onClick={toggleMenu}
            className={({ isActive }) => (isActive ? styles.activeActions : '')}
          >
            <img src={CartHurt} alt="Cart" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
