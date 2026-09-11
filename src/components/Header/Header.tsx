import styles from './Header.module.scss';

import { useContext, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartContext } from '../../context/CartContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('Header must be used inside FavoritesProvider');
  }

  const { favourites } = context;

  const contextCart = useContext(CartContext);

  if (!contextCart) {
    throw new Error('ShoppingCard must be used inside CartProvider');
  }

  const { cartItems } = contextCart;

  const totalLength = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__main}>
          <Link to="/">
            <img
              src="img/Logo.svg"
              alt="Phone catalog"
              className={styles.logo}
            />
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${
                      isActive ? styles['nav__link--selected'] : ''
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${
                      isActive ? styles['nav__link--selected'] : ''
                    }`
                  }
                >
                  Phones
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${
                      isActive ? styles['nav__link--selected'] : ''
                    }`
                  }
                >
                  Tablets
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    `${styles.nav__link} ${
                      isActive ? styles['nav__link--selected'] : ''
                    }`
                  }
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.headerActions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.headerActionButton} ${
                isActive ? styles['headerActionButton--selected'] : ''
              }`
            }
          >
            <div className={styles.favoriteIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.headerActionButton__icon}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5
                5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                />
              </svg>

              {favourites.length > 0 && (
                <span className={styles.favoriteCount}>
                  {favourites.length}
                </span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.headerActionButton} ${
                isActive ? styles['headerActionButton--selected'] : ''
              }`
            }
          >
            <div className={styles.cartIcon}>
              <img
                src="img/icons/shopping-icon.svg"
                alt="Cart"
                className={styles.headerActionButton__icon}
              />
              {cartItems.length > 0 && (
                <span className={styles.cartCount}>{totalLength}</span>
              )}
            </div>
          </NavLink>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            src="img/icons/menu.svg"
            alt="Open menu"
            className={styles.menuButton__icon}
          />
        </button>
      </header>

      <aside
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles['mobileMenu--open'] : ''
        }`}
      >
        <div className={styles.mobileMenu__container}>
          <div className={`${styles['top-bar']} ${styles.menu__top}`}>
            <Link to="/" className={styles['top-bar__logo']}>
              <img
                src="img/Logo.svg"
                alt="Phone catalog"
                className={styles.logo}
              />
            </Link>

            <button
              className={styles['top-bar__closeButton']}
              type="button"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src="img/icons/close-icon.svg"
                alt="Close icon"
                className={styles['top-bar__closeButton__icon']}
              />
            </button>
          </div>

          <nav className={`${styles['mobileMenu-nav']} ${styles.menu__nav}`}>
            <ul className={styles['mobileMenu-nav__list']}>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles['mobileMenu-nav__link']} ${
                      isActive ? styles['mobileMenu-nav__link--selected'] : ''
                    }`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles['mobileMenu-nav__link']} ${
                      isActive ? styles['mobileMenu-nav__link--selected'] : ''
                    }`
                  }
                  to="/phones"
                >
                  Phones
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles['mobileMenu-nav__link']} ${
                      isActive ? styles['mobileMenu-nav__link--selected'] : ''
                    }`
                  }
                  to="/tablets"
                >
                  Tablets
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    `${styles['mobileMenu-nav__link']} ${
                      isActive ? styles['mobileMenu-nav__link--selected'] : ''
                    }`
                  }
                  to="/accessories"
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.mobileMenu__headerActions}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `${styles.headerActionButton} ${
                  isActive ? styles['headerActionButton--selected'] : ''
                }`
              }
            >
              <div className={styles.favoriteIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.headerActionButton__icon}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5
                  5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                  />
                </svg>

                {favourites.length > 0 && (
                  <span className={styles.favoriteCount}>
                    {favourites.length}
                  </span>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.headerActionButton} ${
                  isActive ? styles['headerActionButton--selected'] : ''
                }`
              }
            >
              <div className={styles.cartIcon}>
                <img
                  src="img/icons/shopping-icon.svg"
                  alt="Cart"
                  className={styles.headerActionButton__icon}
                />
                {cartItems.length > 0 && (
                  <span className={styles.cartCount}>{totalLength}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
