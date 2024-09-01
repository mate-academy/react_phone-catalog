/* eslint-disable import/no-extraneous-dependencies */
import { NavLink, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../context/ThemeContext';
import { HeaderProps } from '../../types/Header';
import styles from './Header.module.scss';
import { OverlayMenu } from './components/OverlayMenu';
import { ToggleTheme } from './components/ToggleTheme';
import {
  getMenuIconSrc,
  getLogoIconSrc,
  getCartIconSrc,
  getFavoritesIconSrc,
} from '../../servises/iconSrc';
import { useAppContext } from '../../context/AppContext';
import { Search } from '../Search/Search';

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { theme } = useTheme();
  const { cart, favorites } = useAppContext();

  const toggleIsMenuOpen = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  const menuIconSrc = getMenuIconSrc(isMenuOpen, theme);
  const logoIconSrs = getLogoIconSrc(theme);
  const cartIconSrc = getCartIconSrc(theme);
  const favoritesIconSrc = getFavoritesIconSrc(theme);

  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.logoLink}
        onClick={() => setIsMenuOpen(false)}
      >
        <img src={logoIconSrs} alt="logo" className={styles.logo} />
      </Link>

      <div className={styles.container}>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames(styles.navItem, { [styles.isActive]: isActive })
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              classNames(styles.navItem, { [styles.isActive]: isActive })
            }
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              classNames(styles.navItem, { [styles.isActive]: isActive })
            }
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              classNames(styles.navItem, { [styles.isActive]: isActive })
            }
          >
            Accessories
          </NavLink>
        </nav>

        <div className={styles.actionsContainer}>
          <Search />
          <ToggleTheme />
          <div className={styles.actions}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                classNames(styles.actionItem, { [styles.isActive]: isActive })
              }
            >
              <div className={styles.actionIcon}>
                <img src={favoritesIconSrc} alt="Favorites" />
                {favorites.length > 0 && (
                  <span className={styles.count}>
                    <p className={styles.countText}>{favorites.length}</p>
                  </span>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                classNames(styles.actionItem, { [styles.isActive]: isActive })
              }
            >
              <div className={styles.actionIcon}>
                <img src={cartIconSrc} alt="Cart" className={styles.icon} />
                {cart.length > 0 && (
                  <span className={styles.count}>
                    <p className={styles.countText}>
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </p>
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      <div className={styles.mobile}>
        <ToggleTheme />
        <button
          type="button"
          className={styles.mobileButton}
          onClick={toggleIsMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <img src={menuIconSrc} alt={isMenuOpen ? 'Close menu' : 'Menu'} />
        </button>
      </div>
      <OverlayMenu
        isMenuOpen={isMenuOpen}
        toggleIsMenuOpen={toggleIsMenuOpen}
        favoritesIconSrc={favoritesIconSrc}
        cartIconSrc={cartIconSrc}
        favorites={favorites}
        cart={cart}
      />
    </header>
  );
};

export default Header;
