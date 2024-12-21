import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { useAppSelector } from '../../../app/hooks';

const setLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.menu__link, {
    [styles['menu__link--active']]: isActive,
  });

const setActiveOption = ({ isActive }: { isActive: boolean }) =>
  cn(styles['header__option-link'], {
    [styles['header__option-link--active']]: isActive,
  });

export const Header: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { favourites } = useAppSelector(state => state.favourites);
  const { cart } = useAppSelector(state => state.cart);

  return (
    <header
      className={cn([[styles.header]], {
        [styles['menu-open']]: menuIsOpen,
      })}
    >
      <div className={styles.header__navigations}>
        <Link
          to="/"
          className={styles.header__logo}
          onClick={() => setMenuIsOpen(false)}
        >
          <img src="./img/icons/Logo.svg" alt="Logo" />
        </Link>

        <div className={`${styles.header__menu} ${styles.menu}`}>
          <nav className={styles.menu__body}>
            <ul className={styles.menu__list}>
              <li className={styles.menu__item}>
                <NavLink
                  to="/"
                  className={setLinkClass}
                  onClick={() => setMenuIsOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li className={styles.menu__item}>
                <NavLink
                  to="/phones"
                  className={setLinkClass}
                  onClick={() => setMenuIsOpen(false)}
                >
                  Phones
                </NavLink>
              </li>
              <li className={styles.menu__item}>
                <NavLink
                  to="/tablets"
                  className={setLinkClass}
                  onClick={() => setMenuIsOpen(false)}
                >
                  Tablets
                </NavLink>
              </li>
              <li className={styles.menu__item}>
                <NavLink
                  to="/accessories"
                  className={setLinkClass}
                  onClick={() => setMenuIsOpen(false)}
                >
                  Accessories
                </NavLink>
              </li>
            </ul>

            <div className={styles.header__options}>
              <div className={styles.header__option}>
                <NavLink
                  to="/favorites"
                  className={setActiveOption}
                  onClick={() => setMenuIsOpen(false)}
                >
                  {favourites.length > 0 && (
                    <span className={styles.header__counter}>
                      {favourites.length}
                    </span>
                  )}

                  <img src="./img/icons/like.svg" alt="like" />
                </NavLink>
              </div>

              <div className={styles.header__option}>
                <NavLink
                  to="/cart"
                  className={setActiveOption}
                  onClick={() => setMenuIsOpen(false)}
                >
                  {cart.length > 0 && (
                    <span className={styles.header__counter}>
                      {cart.length}
                    </span>
                  )}

                  <img src="./img/icons/busket.svg" alt="busket" />
                </NavLink>
              </div>
            </div>
          </nav>
        </div>

        <button
          type="button"
          className={`${styles['icon-menu']}`}
          onClick={() => setMenuIsOpen(curr => !curr)}
        >
          <div className={styles['icon-menu__icon']}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  );
};
