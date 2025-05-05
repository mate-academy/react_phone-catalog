import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductsContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const actionLinks = [
  {
    to: '/favorites',
    icon: 'img/icons/favorites-empty.svg',
    alt: 'favorites',
    className: 'header__favorites',
  },
  {
    to: '/cart',
    icon: 'img/icons/cart.svg',
    alt: 'cart',
    className: 'header__cart',
  },
];

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.header__link, {
    [styles['active-link']]: isActive,
  });

export const Header: React.FC = () => {
  const { products } = useProducts();
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const bodyRef = React.useRef(document.body);

  const toggleBurger = () => {
    setIsBurgerActive(prev => !prev);
  };

  useEffect(() => {
    if (isBurgerActive) {
      bodyRef.current.classList.add('lock-scroll');
    } else {
      bodyRef.current.classList.remove('lock-scroll');
    }
  }, [isBurgerActive]);

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

  const favoritesIds: string[] = useSelector(
    (state: RootState) => state.favorites,
  );

  const favorites =
    products && Array.isArray(products)
      ? products.filter(product => favoritesIds.includes(product.itemId))
      : [];

  const favoritesCount = favorites.length;

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>
          <Link to="/">
            <img src="img/icons/logo.svg" alt="logo" />
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
                src="img/icons/logo.svg"
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
            {actionLinks.map(({ to, icon, alt, className }) => (
              <button key={to} className={styles[className]}>
                <NavLink
                  to={to}
                  className={getNavLinkClass}
                  onClick={() => setIsBurgerActive(false)}
                >
                  <img src={icon} alt={alt} />
                  {to === '/favorites' && favoritesCount > 0 && (
                    <span className={styles.header__count}>
                      {favoritesCount}
                    </span>
                  )}
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
