import logo from '../../../public/img/Logo.png';
import iconHeart from '../../../public/img/icons/Favourites (Heart Like).png';
import iconBag from '../../../public/img/icons/Shopping bag (Cart).png';
import iconBurger from '../../../public/img/icons/Menu.png';
import iconClose from '../../../public/img/icons/Close.png';

import { Link, NavLink } from 'react-router-dom';

import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const getFavoritesCount = () => {
    const favFromLocal = localStorage.getItem('favorites');

    if (!favFromLocal) {
      return;
    }

    const parsed = JSON.parse(favFromLocal);

    setFavoritesCount(parsed.length);
  };

  const getCartCount = () => {
    const cartFromLocal = localStorage.getItem('cart');

    if (!cartFromLocal) {
      return;
    }

    const parsed = JSON.parse(cartFromLocal);

    setCartCount(parsed.length);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    getFavoritesCount();
    getCartCount();

    window.addEventListener('storage', getFavoritesCount);
    window.addEventListener('storage', getCartCount);

    return () => {
      window.removeEventListener('storage', getFavoritesCount);
      window.removeEventListener('storage', getCartCount);
    };
  }, []);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
    }, 100);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      setIsMenuOpen(true);
      setIsClosing(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          <img className={styles.header__logoImage} src={logo} alt="Logo" />
        </Link>

        <nav className={styles.header__nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__navLink} ${styles['header__navLink--active']}`
                : styles.header__navLink
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__navLink} ${styles['header__navLink--active']}`
                : styles.header__navLink
            }
          >
            PHONES
          </NavLink>
          <NavLink
            to={'/tablets'}
            className={({ isActive }) =>
              isActive
                ? `${styles.header__navLink} ${styles['header__navLink--active']}`
                : styles.header__navLink
            }
          >
            TABLETS
          </NavLink>
          <NavLink
            to={'/accessories'}
            className={({ isActive }) =>
              isActive
                ? `${styles.header__navLink} ${styles['header__navLink--active']}`
                : styles.header__navLink
            }
          >
            ACCESSORIES
          </NavLink>
        </nav>

        <div className={styles.header__actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.header__icon} ${styles['header__icon--favorite']} ${
                isActive ? styles['header__icon--active'] : ''
              }`
            }
          >
            <span className={styles.header__iconWrapper}>
              <img
                className={styles.header__iconImage}
                src={iconHeart}
                alt=""
              />

              {favoritesCount > 0 && (
                <span className={styles.header__iconBadge}>
                  {favoritesCount}
                </span>
              )}
            </span>
          </NavLink>
          <NavLink
            to={'/cart'}
            className={({ isActive }) =>
              `${styles.header__icon} ${styles['header__icon--bag']} ${
                isActive ? styles['header__icon--active'] : ''
              }`
            }
          >
            <span className={styles.header__iconWrapper}>
              <img className={styles.header__iconImage} src={iconBag} alt="" />

              {cartCount > 0 && (
                <span className={styles.header__iconBadge}>{cartCount}</span>
              )}
            </span>
          </NavLink>
          <button className={styles.header__burger} onClick={toggleMenu}>
            {isMenuOpen ? (
              <img
                className={styles.header__burgerImage}
                src={iconClose}
                alt=""
              />
            ) : (
              <img
                className={styles.header__burgerImage}
                src={iconBurger}
                alt=""
              />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className={`${styles.header__menu} ${isClosing ? styles['header__menu--closing'] : ''}`}
          >
            <nav className={styles.header__menuNav}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header__menuLink} ${styles['header__menuLink--active']}`
                    : styles.header__menuLink
                }
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                HOME
              </NavLink>
              <NavLink
                to={'/phones'}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header__menuLink} ${styles['header__menuLink--active']}`
                    : styles.header__menuLink
                }
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                PHONES
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header__menuLink} ${styles['header__menuLink--active']}`
                    : styles.header__menuLink
                }
                to={'/tablets'}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                TABLETS
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header__menuLink} ${styles['header__menuLink--active']}`
                    : styles.header__menuLink
                }
                to={'/accessories'}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ACCESSORIES
              </NavLink>
            </nav>
            <div className={styles.header__menuActions}>
              <NavLink
                to={'/favorites'}
                className={({ isActive }) =>
                  `${styles.header__menuIcon} ${styles['header__menuIcon--favorite']} ${
                    isActive ? styles['header__menuIcon--active'] : ''
                  }`
                }
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className={styles.header__iconWrapper}>
                  <img
                    className={styles.header__menuImage}
                    src={iconHeart}
                    alt=""
                  />
                  {favoritesCount > 0 && (
                    <span className={styles.header__iconBadge}>
                      {favoritesCount}
                    </span>
                  )}
                </span>
              </NavLink>
              <NavLink
                to={'/cart'}
                className={({ isActive }) =>
                  `${styles.header__menuIcon} ${styles['header__menuIcon--bag']} ${
                    isActive ? styles['header__menuIcon--active'] : ''
                  }`
                }
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className={styles.header__iconWrapper}>
                  <img
                    className={styles.header__menuImage}
                    src={iconBag}
                    alt=""
                  />
                  {cartCount > 0 && (
                    <span className={styles.header__iconBadge}>
                      {cartCount}
                    </span>
                  )}
                </span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
