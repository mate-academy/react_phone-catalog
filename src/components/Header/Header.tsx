import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useStore } from '../../context/StoreContext';
import { SearchBar } from '../SearchBar';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const SEARCH_PATHS = ['/phones', '/tablets', '/accessories', '/favorites'];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites, totalCartQuantity } = useStore();
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const actionLinks = [
    { to: '/favorites', icon: 'heart', count: favorites.length },
    { to: '/cart', icon: 'cart', count: totalCartQuantity },
  ];

  const renderNavLinks = (block: 'nav' | 'menu') =>
    NAV_LINKS.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          classNames(styles[`${block}__link`], {
            [styles[`${block}__link--active`]]: isActive,
          })
        }
      >
        {label}
      </NavLink>
    ));

  const renderActionLinks = (className: string, onClick?: () => void) =>
    actionLinks.map(({ to, icon, count }) => (
      <Link key={to} to={to} className={className} onClick={onClick}>
        <img
          src={`${import.meta.env.BASE_URL}img/icons/${icon}.svg`}
          alt={icon}
        />
        {count > 0 && <span className={styles.badge}>{count}</span>}
      </Link>
    ));

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img
            src={`${import.meta.env.BASE_URL}img/Logo.png`}
            alt="Nice Gadgets"
            className={styles.logo__img}
          />
        </Link>

        <div className={styles.header__center}>
          <nav className={styles.nav}>{renderNavLinks('nav')}</nav>

          {SEARCH_PATHS.includes(pathname) && <SearchBar key={pathname} />}
        </div>

        <div className={styles.actions}>
          {renderActionLinks(
            classNames(styles.actions__btn, styles['actions__btn--desktop']),
          )}

          <button
            className={styles.burger}
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <i
              className={isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}
            />
          </button>
        </div>
      </div>

      <aside
        className={classNames(styles.menu, {
          [styles['menu--open']]: isMenuOpen,
        })}
      >
        <nav className={styles.menu__nav}>{renderNavLinks('menu')}</nav>

        <div className={styles.menu__footer}>
          {renderActionLinks(styles.actions__btn, closeMenu)}
        </div>
      </aside>
    </header>
  );
};
