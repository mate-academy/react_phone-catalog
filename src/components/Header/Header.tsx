import styles from './Header.module.scss';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import {
  getCartIcon,
  getLikeIcon,
  getLogoIcon,
  getMenuIcon,
} from '../../utils/getIcons';
import { useTheme } from '../../context/ThemeContext';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';
import { AsideMenu } from '../AsideMenu/AsideMenu';

export const Header = () => {
  const { theme } = useTheme();

  const { favourites, cart } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuVisibility = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  const logoIcon = getLogoIcon(theme);
  const likeIcon = getLikeIcon(theme);
  const cartIcon = getCartIcon(theme);
  const menuIcon = getMenuIcon(isMenuOpen, theme);

  const numberOfCartItems = cart.reduce(
    (number, item) => number + item.quantity,
    0,
  );

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink}>
        <img src={logoIcon} alt="logo" />
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

        <div className={styles.actionsWrapper}>
          <SearchBar />

          <ThemeSwitcher />

          <div className={styles.actions}>
            <NavLink to="/favourites" className={styles.actionsItem}>
              <div className={styles.actionsIcon}>
                <img src={likeIcon} alt="like" />

                {favourites.length > 0 && (
                  <span className={styles.productCount}>
                    <p className={styles.productCountNumbers}>
                      {favourites.length}
                    </p>
                  </span>
                )}
              </div>
            </NavLink>

            <NavLink to="/cart" className={styles.actionsItem}>
              <div className={styles.actionsIcon}>
                <img src={cartIcon} alt="cart" />

                {cart.length > 0 && (
                  <span className={styles.productCount}>
                    <p className={styles.productCountNumbers}>
                      {numberOfCartItems}
                    </p>
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      <div className={styles.containerMobile}>
        <ThemeSwitcher />

        <button
          type="button"
          className={styles.buttonMobile}
          onClick={handleMenuVisibility}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <img src={menuIcon} alt={isMenuOpen ? 'Close menu' : 'Menu'} />
        </button>
      </div>

      <AsideMenu
        isMenuOpen={isMenuOpen}
        handleMenuVisibility={handleMenuVisibility}
        likeIcon={likeIcon}
        cartIcon={cartIcon}
        favourites={favourites}
        cart={cart}
      />
    </header>
  );
};
