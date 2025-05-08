import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';
import { HeaderBurger } from './HeaderBurger';
import { HeaderActions } from './HeaderActions';
import { HeaderList } from './HeaderList';

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

  const cart: string[] = useSelector((state: RootState) => state.cart);

  const cartCount = cart.length;
  const favoritesCount = favoritesIds.length;

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

          <HeaderList
            navLinks={navLinks}
            getNavLinkClass={getNavLinkClass}
            setIsBurgerActive={setIsBurgerActive}
          />

          <HeaderActions
            getNavLinkClass={getNavLinkClass}
            favoritesCount={favoritesCount}
            cartCount={cartCount}
            actionLinks={actionLinks}
            setIsBurgerActive={setIsBurgerActive}
          />
        </nav>

        <HeaderBurger
          toggleBurger={toggleBurger}
          isBurgerActive={isBurgerActive}
        />
      </div>
    </header>
  );
};
