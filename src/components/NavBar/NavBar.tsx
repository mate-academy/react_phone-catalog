import React from 'react';
import styles from './NavBar.module.scss';
import logo from '../../assets/icons/logo.svg';
import logoLight from '../../assets/icons/logoLight.svg';
import close from '../../assets/icons/close.svg';
import closeLight from '../../assets/icons/closeLight.svg';
import heart from '../../assets/icons/heart.svg';
import heartLight from '../../assets/icons/heartLight.svg';
import bag from '../../assets/icons/bagCart.svg';
import bagLight from '../../assets/icons/bagCartLight.svg';
import menu from '../../assets/icons/menu.svg';
import menuLight from '../../assets/icons/menuLight.svg';
import { useTheme } from '../Themes';
import { useFavourites } from '../Favourites/FavouritesContext';
import { useCart } from '../BoughtCart/CartContext';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { Switcher } from '../Switcher';

interface NavBarProops {
  setMenuIsOpen: () => void;
  menuIsOpen: boolean;
  setMenuIsClose: () => void;
}

export const NavBar: React.FC<NavBarProops> = ({
  setMenuIsOpen,
  menuIsOpen,
  setMenuIsClose,
}) => {
  const { theme } = useTheme();
  const { favourites } = useFavourites();
  const { cart } = useCart();
  const isBasicDark = theme === 'dark';

  const totalItemCount = cart.reduce((acc, item) => {
    return acc + (item.quantity || 1);
  }, 0);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles['navbar-item'], {
      [styles['navbar-item--active']]: isActive,
    });

  return (
    <header className={styles.header}>
      <nav
        className={classNames(
          styles.navbar,
          styles['is-fixed-top'],
          styles['has-shadow'],
        )}
        role="navigation"
        aria-label="main navigator"
      >
        <div className={styles.container}>
          <div className={styles.wrapper__navbar}>
            <NavLink className={styles.logo} to="/">
              <img
                src={isBasicDark ? logo : logoLight}
                alt="logo"
                className={styles.logo__img}
              />
            </NavLink>
            <div className={styles['navbar-brand']}>
              <NavLink className={getLinkClass} to="/">
                Home
              </NavLink>
              <NavLink className={getLinkClass} to="/phones">
                Phones
              </NavLink>
              <NavLink className={getLinkClass} to="/tablets">
                Tablets
              </NavLink>
              <NavLink className={getLinkClass} to="/accessories">
                Accessories
              </NavLink>
            </div>
          </div>

          <div className={styles.buttons__menu}>
            <Switcher />
            <NavLink
              className={classNames(styles.logo, styles.likes)}
              to="/favourites"
            >
              <img src={isBasicDark ? heart : heartLight} alt="" />
              {favourites.length > 0 && (
                <span className={styles.badge2}>{favourites.length}</span>
              )}
            </NavLink>

            <NavLink
              className={classNames(styles.logo, styles.shopping)}
              to="/cart"
            >
              <img src={isBasicDark ? bag : bagLight} alt="shopping" />
              {cart.length > 0 && (
                <span className={styles.badge}>{totalItemCount}</span>
              )}
            </NavLink>

            {menuIsOpen ? (
              <div
                className={classNames(styles.logo, styles.menu, styles.close)}
                onClick={setMenuIsClose}
              >
                <img src={isBasicDark ? close : closeLight} alt="close" />
              </div>
            ) : (
              <div
                className={classNames(styles.logo, styles.menu)}
                onClick={setMenuIsOpen}
              >
                <img src={isBasicDark ? menu : menuLight} alt="menu" />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
