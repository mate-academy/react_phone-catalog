import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.scss';

import logo from '../../../../assets/images/Logo.png';
import burgerIcon from '../../../../assets/images/Menu.svg';
import closeIcon from '../../../../assets/images/Close.svg';
import cartIcon from '../../../../assets/images/Cart.svg';
import favoriteIcon from '../../../../assets/images/Favourites.svg';
import { useFavorites } from '../../context/FavoriteContext';
import { useCart } from '../../context/CartContext';

export const Navbar: React.FC = () => {
  const { favorites } = useFavorites();
  const { totalCount } = useCart(); // Використовуємо загальну кількість
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const getCategoryClass = (category: string) => {
    const isActive = pathname.startsWith(`/${category}`);

    return isActive
      ? `${styles.navbar__link} ${styles['navbar__link--active']}`
      : styles.navbar__link;
  };

  const getHomeLinkClass = () => {
    const isHome = pathname === '/';

    return isHome
      ? `${styles.navbar__link} ${styles['navbar__link--active']}`
      : styles.navbar__link;
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.navbar__left}>
          <div className={styles.navbar__logo}>
            <Link to="/" className={styles['navbar__logo-link']}>
              <img
                src={logo}
                alt="Logo"
                className={styles['navbar__logo-img']}
              />
            </Link>
          </div>

          <ul className={styles.navbar__links}>
            <li className={styles.navbar__item}>
              <Link to="/" className={getHomeLinkClass()}>
                Home
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <Link to="/phones" className={getCategoryClass('phones')}>
                Phones
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <Link to="/tablets" className={getCategoryClass('tablets')}>
                Tablets
              </Link>
            </li>
            <li className={styles.navbar__item}>
              <Link
                to="/accessories"
                className={getCategoryClass('accessories')}
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.navbar__right}>
          <div className={styles.navbar__actions}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `${styles.navbar__button} ${styles['navbar__button--favorites']} ${
                  isActive ? styles['navbar__button--active'] : ''
                }`
              }
            >
              <div className={styles.favoritesWrapper}>
                <img
                  src={favoriteIcon}
                  alt="Favorites"
                  className={styles.navbar__icon}
                />

                {favorites.length > 0 && (
                  <span className={styles.favoritesCount}>
                    {favorites.length}
                  </span>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.navbar__button} ${styles['navbar__button--cart']} ${
                  isActive ? styles['navbar__button--active'] : ''
                }`
              }
            >
              <div className={styles.cartWrapper}>
                <img
                  src={cartIcon}
                  alt="Cart"
                  className={styles.navbar__icon}
                />
                {totalCount > 0 && (
                  <span className={styles.cartCount}>{totalCount}</span>
                )}
              </div>
            </NavLink>

            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${styles.navbar__button} ${styles['navbar__button--burger']}`}
            >
              <img
                src={isMenuOpen ? closeIcon : burgerIcon}
                alt="Menu"
                className={styles.navbar__icon}
              />
            </button>
          </div>
        </div>
      </nav>

      <aside
        className={`${styles.menu} ${isMenuOpen ? styles['menu--open'] : ''}`}
      >
        <div className={styles.menu__content}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link to="/" className={getHomeLinkClass()} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link
                to="/phones"
                className={getCategoryClass('phones')}
                onClick={closeMenu}
              >
                Phones
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link
                to="/tablets"
                className={getCategoryClass('tablets')}
                onClick={closeMenu}
              >
                Tablets
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link
                to="/accessories"
                className={getCategoryClass('accessories')}
                onClick={closeMenu}
              >
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.menu__footer}>
          <NavLink
            to="/favorites"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.menu__button} ${
                isActive ? styles['menu__button--active'] : ''
              }`
            }
          >
            <div className={styles.favoritesWrapper}>
              <img src={favoriteIcon} alt="Favorites" />
              {favorites.length > 0 && (
                <span className={styles.favoritesCount}>
                  {favorites.length}
                </span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            onClick={closeMenu}
            className={({ isActive }) =>
              `${styles.menu__button} ${
                isActive ? styles['menu__button--active'] : ''
              }`
            }
          >
            <div className={styles.cartWrapper}>
              <img src={cartIcon} alt="Cart" />
              {totalCount > 0 && (
                <span className={styles.cartCount}>{totalCount}</span>
              )}
            </div>
          </NavLink>
        </div>
      </aside>
    </header>
  );
};
