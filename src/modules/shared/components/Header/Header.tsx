import styles from './Header.module.scss';
import logo from './../../../../../public/img/logo.svg';
import favorites from './../../../../../public/img/favourites.svg';
import cart from './../../../../../public/img/cart.svg';
import { navLinks } from './constants';
import {
  Link,
  NavLink,
  NavLinkRenderProps,
  useLocation,
} from 'react-router-dom';
import classNames from 'classnames';
import { useAppSelector } from '../../../../app/hooks';
import menuOpen from './../../../../../public/img/icons/menu.png';
import menuClose from './../../../../../public/img/icons/delete.png';

import { useEffect, useState } from 'react';

export const Header = () => {
  const location = useLocation();

  const from = location.state?.from || 'Home';

  const favoritesIds = useAppSelector(state => state.favorites);
  const cartProducts = useAppSelector(state => state.cart);
  const count = cartProducts.reduce((accum, curr) => accum + curr.count, 0);

  const [burgerMenu, setBurgerMenu] = useState<boolean>(false);

  useEffect(() => {
    if (burgerMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [burgerMenu]);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="logo" />
        </Link>
        <nav className={styles.menu}>
          <ul className={styles.menu__items}>
            {navLinks.map(link => (
              <li key={link.id} className={styles.menu__item}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    classNames(styles.menu__link, {
                      [styles.active]:
                        isActive ||
                        (location.pathname.startsWith('/product') &&
                          from === link.label),
                    })
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.header__actions}>
          <span className={styles.actions__wrapper}>
            <NavLink
              data-count={favoritesIds.length}
              to="/favorites"
              className={({ isActive }) =>
                classNames(styles.actions__link, {
                  [styles.active]: isActive,
                  [styles.favorites]: favoritesIds.length > 0,
                })
              }
            >
              <img src={favorites} alt="favorites" />
            </NavLink>
          </span>
          <span className={styles.actions__wrapper}>
            <NavLink
              data-count={count}
              to="/cart"
              className={({ isActive }) =>
                classNames(styles.actions__link, {
                  [styles.active]: isActive,
                  [styles.cart]: cartProducts.length > 0,
                })
              }
            >
              <img src={cart} alt="cart" />
            </NavLink>
          </span>
        </div>

        <div className={styles.menu__burger}>
          <img
            onClick={() => setBurgerMenu(true)}
            src={menuOpen}
            alt="Open menu"
          />
        </div>

        {burgerMenu && (
          <div className={styles.burgerMenu}>
            <div className={styles.burger__header}>
              <Link to="/" className={styles.logo}>
                <img src={logo} alt="logo" />
              </Link>
              <div className={styles.menu__burger}>
                <img
                  onClick={() => setBurgerMenu(false)}
                  src={menuClose}
                  alt="Close menu"
                />
              </div>
            </div>
            <nav className={styles.menu}>
              <ul className={styles.menu__items}>
                {navLinks.map(link => (
                  <li key={link.id} className={styles.menu__item}>
                    <NavLink
                      to={link.href}
                      onClick={() => setBurgerMenu(false)}
                      className={({ isActive }) =>
                        classNames(styles.menu__link, {
                          [styles.active]:
                            isActive ||
                            (location.pathname.startsWith('/product') &&
                              from === link.label),
                        })
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.header__actions}>
              <span className={`${styles.actions__wrapper} ${styles.withline}`}>
                <NavLink
                  data-count={favoritesIds.length}
                  to="/favorites"
                  onClick={() => setBurgerMenu(false)}
                  className={({ isActive }) =>
                    classNames(styles.actions__link, {
                      [styles.active]: isActive,
                      [styles.favorites]: favoritesIds.length > 0,
                    })
                  }
                >
                  <img src={favorites} alt="favorites" />
                </NavLink>
              </span>
              <span className={styles.actions__wrapper}>
                <NavLink
                  data-count={cartProducts.length}
                  to="/cart"
                  onClick={() => setBurgerMenu(false)}
                  className={({ isActive }) =>
                    classNames(styles.actions__link, {
                      [styles.active]: isActive,
                      [styles.favorites]: favoritesIds.length > 0,
                    })
                  }
                >
                  <img src={cart} alt="cart" />
                </NavLink>
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
