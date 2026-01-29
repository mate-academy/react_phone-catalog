import { useState } from 'react';
import styles from './ Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from '../Menu/Menu';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favoriteProducts } = useFavorites();
  const { totalQuantity } = useCart();

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.header__nav}>
          <Link to="/" className={styles.header__logo}>
            <img
              src="./img/logo.svg"
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
              src="./img/icons/icon-burger-menu.svg"
              alt="icon-menu"
              className={styles.header__icon}
            />
          </button>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__button} ${styles['header__button--active']} ${styles['header__button--heart']}`
                : `${styles.header__button} ${styles['header__button--heart']}`
            }
          >
            <div className={styles.header__iconWrapper}>
              <img
                src="./img/icons/icon-heart.svg"
                alt="icon-heart"
                className={styles.header__icon}
              />

              {favoriteProducts.length > 0 && (
                <div className={styles.header__iconNumber}>
                  {favoriteProducts.length}
                </div>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__button} ${styles['header__button--active']} ${styles['header__button--bag']}`
                : `${styles.header__button} ${styles['header__button--bag']}`
            }
          >
            <div className={styles.header__iconWrapper}>
              <img
                src="./img/icons/icon-shopping-bag.svg"
                alt="icon-shopping-bag"
                className={styles.header__icon}
              />

              {totalQuantity > 0 && (
                <div className={styles.header__iconNumber}>{totalQuantity}</div>
              )}
            </div>
          </NavLink>
        </div>
      </header>

      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
};
