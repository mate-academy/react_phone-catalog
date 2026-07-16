import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useState } from 'react';
import { Badge } from '../Badge';

//#region svgs
import Logo from '../../icons/Logo.svg';
import Burger from '../../icons/Burger.svg';
import Cart from '../../icons/Cart.svg';
import Like from '../../icons/like.svg';
import Close from '../../icons/Close.svg';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
//#endregion

export function Header() {
  const nav = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { totalItems } = useCart();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <img
            className={styles.header__logo}
            src={Logo}
            alt="Logo"
            onClick={() => nav(`/`)}
          />
          <nav className={styles.header__nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__nav__link} ${styles.active}`
                  : styles.header__nav__link
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__nav__link} ${styles.active}`
                  : styles.header__nav__link
              }
            >
              PHONES
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__nav__link} ${styles.active}`
                  : styles.header__nav__link
              }
            >
              TABLETS
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__nav__link} ${styles.active}`
                  : styles.header__nav__link
              }
            >
              ACCESSORIES
            </NavLink>
          </nav>
        </div>
        <div className={styles.header__right}>
          <button className={styles.header__switch}>
            {isMenuOpen ? (
              <img
                className={styles.header__burger}
                src={Close}
                alt="Burger"
                onClick={() => setIsMenuOpen(false)}
              />
            ) : (
              <img
                className={styles.header__burger}
                src={Burger}
                alt="Burger"
                onClick={() => setIsMenuOpen(true)}
              />
            )}
          </button>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__navlink} ${styles.active}`
                : styles.header__navlink
            }
          >
            <img className={styles.header__fav} src={Like} alt="Favorites" />
            <div className={styles.header__badge}>
              <Badge count={favorites.length} />
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.header__navlink} ${styles.header__navlink__cart} ${styles.active}`
                : `${styles.header__navlink} ${styles.header__navlink__cart}`
            }
          >
            <img className={styles.header__cart} src={Cart} alt="Cart" />
            <div className={styles.header__badge}>
              <Badge count={totalItems} />
            </div>
          </NavLink>
        </div>
      </header>
      {isMenuOpen && (
        <div className={styles.mobile}>
          <nav className={styles.mobile__nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__nav__link} ${styles.active}`
                  : styles.header__nav__link
              }
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__nav__link} ${styles.active}`
                  : styles.header__nav__link
              }
              onClick={() => setIsMenuOpen(false)}
            >
              PHONES
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__nav__link} ${styles.active}`
                  : styles.header__nav__link
              }
              onClick={() => setIsMenuOpen(false)}
            >
              TABLETS
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive
                  ? `${styles.header__nav__link} ${styles.active}`
                  : styles.header__nav__link
              }
              onClick={() => setIsMenuOpen(false)}
            >
              ACCESSORIES
            </NavLink>
          </nav>
          <div className={styles.mobileBot}>
            <NavLink
              to={'/favorites'}
              className={styles.mobileBot__nav}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.iconWrapper}>
                <img
                  className={styles.mobileBot__fav}
                  src={Like}
                  alt="Favorites"
                />
                <Badge count={favorites.length} />
              </span>
            </NavLink>
            <NavLink
              to={'/cart'}
              className={styles.mobileBot__nav}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.iconWrapper}>
                <img className={styles.mobileBot__cart} src={Cart} alt="Cart" />
                <Badge count={totalItems} />
              </span>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
}
