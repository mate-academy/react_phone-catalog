import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const actionLinks = [
  { to: '/favorites', icon: '/img/icons/favorites.svg', alt: 'favorites' },
  { to: '/cart', icon: '/img/icons/cart.svg', alt: 'cart' },
];

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.header__link, {
    [styles['active-link']]: isActive,
  });

export const Header: React.FC = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const toggleBurger = () => {
    setIsBurgerActive(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 700) {
        setIsBurgerActive(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>
          <Link to="/">
            <img src="/img/icons/logo.svg" alt="logo" />
          </Link>
        </div>

        <nav
          className={classNames(styles.header__nav, {
            [styles['header__nav--active']]: isBurgerActive,
          })}
        >
          <div className={styles['header__logo--mobile']}>
            <Link to="/" onClick={() => setIsBurgerActive(false)}>
              <img
                className={styles.header__logo}
                src="/img/icons/logo.svg"
                alt="logo"
              />
            </Link>
          </div>

          <ul className={styles.header__list}>
            {navLinks.map(({ to, label }) => (
              <li key={to} className={styles.header__item}>
                <NavLink
                  to={to}
                  className={getNavLinkClass}
                  onClick={() => setIsBurgerActive(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.header__actions}>
            {actionLinks.map(({ to, icon, alt }) => (
              <button key={to} className={styles.header__favorites}>
                <NavLink
                  to={to}
                  className={getNavLinkClass}
                  onClick={() => setIsBurgerActive(false)}
                >
                  <img src={icon} alt={alt} />
                </NavLink>
              </button>
            ))}
          </div>
        </nav>

        <div className={styles.header__burger} onClick={toggleBurger}>
          <button
            className={classNames(styles.header__button, {
              [styles.active]: isBurgerActive,
            })}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
