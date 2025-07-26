import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import Logo from '../../assets/icons/Logo.svg';
import burgerMenu from '../../assets/icons/burger.svg';
import heart from '../../assets/icons/heart.svg';
import cartIcon from '../../assets/icons/cart.svg';

import styles from './Navbar.module.scss';
import { BurgerMenu } from '../BurgerMenu';
import { DataContext } from '../../context/DataContext';

const menuLinks = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

export const Navbar: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen, favorites, cart } =
    useContext(DataContext);
  const favoritesAmount = favorites.length;
  const cartAmount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.navbar}>
          <div className={styles.navbar__top}>
            <Link to="/">
              <img src={Logo} alt="logo" className={styles.navbar__logo} />
            </Link>

            <ul className={styles.menuList}>
              {menuLinks.map(({ to, label }) => (
                <li key={label} className={styles.menuList__item}>
                  <NavLink
                    to={to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      classNames(styles.menuList__link, {
                        [styles.active]: isActive,
                      })
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.navbarIcons}>
            <NavLink
              to={'/favorites'}
              aria-label="Favourites"
              className={`${styles.navbarIcons__item} ${styles.navbarIcons__item_heart}`}
            >
              <img
                src={heart}
                className={styles.navbarIcons__icon}
                alt="Favorites"
              />
              {favoritesAmount > 0 && (
                <span className={styles.navbarIcons__amount}>
                  {favoritesAmount}
                </span>
              )}
            </NavLink>
            <NavLink
              to={'/cart'}
              aria-label="Cart"
              className={styles.navbarIcons__item}
            >
              <img
                src={cartIcon}
                className={styles.navbarIcons__icon}
                alt="Cart"
              />
              {cartAmount > 0 && (
                <span className={styles.navbarIcons__amount}>{cartAmount}</span>
              )}
            </NavLink>
          </div>

          <button
            className={`${styles.navbarIcons__item} ${styles.burger}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <img src={burgerMenu} alt="Open menu" />
          </button>

          {isMenuOpen && (
            <BurgerMenu
              menuLinks={menuLinks}
              closeMenu={closeMenu}
              isMenuOpen={isMenuOpen}
            />
          )}
        </nav>
      </div>
    </header>
  );
};
