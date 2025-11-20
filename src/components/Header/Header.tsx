import { useState } from 'react';
import styles from './ Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from '../Menu/Menu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.header__nav}>
          <Link to="/" className={styles.header__logo}>
            <img
              src="../public/img/logo.svg"
              alt="Nice Gadgets"
              className={styles.header__logo__img}
            />
          </Link>

          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__item}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header__nav__link} ${styles['header__nav__link--active']}`
                    : styles.header__nav__link
                }
              >
                HOME
              </NavLink>
            </li>
            <li className={styles.header__nav__item}>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header__nav__link} ${styles['header__nav__link--active']}`
                    : styles.header__nav__link
                }
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.header__nav__item}>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header__nav__link} ${styles['header__nav__link--active']}`
                    : styles.header__nav__link
                }
              >
                TABLETS
              </NavLink>
            </li>
            <li className={styles.header__nav__item}>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header__nav__link} ${styles['header__nav__link--active']}`
                    : styles.header__nav__link
                }
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.header__buttons}>
          <button
            className={`${styles.header__button} ${styles['header__button--menu']}`}
            onClick={() => setIsMenuOpen(true)}
          >
            <img
              src="/public/img/icons/icon-burger-menu.svg"
              alt="icon-menu"
              className={styles.header__icon}
            />
          </button>
          <NavLink
            to="/favorites"
            className={`${styles.header__button} ${styles['header__button--heart']}`}
          >
            <img
              src="/public/img/icons/icon-heart.svg"
              alt="icon-heart"
              className={styles.header__icon}
            />
          </NavLink>
          <NavLink
            to="/cart"
            className={`${styles.header__button} ${styles['header__button--bag']}`}
          >
            <img
              src="/public/img/icons/icon-shopping-bag.svg"
              alt="icon-shopping-bag"
              className={styles.header__icon}
            />
          </NavLink>
        </div>
      </header>

      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};
