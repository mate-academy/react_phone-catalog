import { useContext } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { AppContext } from '../../Root';
import { StorageItem } from '../../types/StorageItem';
import { countItems } from '../../utils/countItems';
import { scrollToTop } from '../../utils/scrollToTop';
import styles from './Header.module.scss';

type AddClass = (param: { isActive: boolean }) => string;

const addNavLinkClass: AddClass = ({ isActive }) =>
  classNames(styles.navLink, {
    [styles.navLinkActive]: isActive,
  });

const addIconHeartLinkClass: AddClass = ({ isActive }) =>
  classNames(styles.iconLink, styles.iconLinkHeart, {
    [styles.iconLinkActive]: isActive,
  });

const addIconCartLinkClass: AddClass = ({ isActive }) =>
  classNames(styles.iconLink, styles.iconLinkCart, {
    [styles.iconLinkActive]: isActive,
  });

export const addIconCounterClass = (items: StorageItem[]): string =>
  classNames(styles.iconCounter, {
    [styles.hidden]: !items.length,
  });

export const Header = () => {
  const { pathname } = useLocation();
  const { favouritesItems, cartItems } = useContext(AppContext);

  return (
    <div className={styles.header}>
      <div className={styles.contentLeft}>
        <div className={styles.logoWrapper}>
          <div className={styles.logo} onClick={scrollToTop}>
            <img
              className={styles.logoImg}
              src="img/icons/logo.svg"
              alt="Logo"
            />
          </div>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink className={addNavLinkClass} to="/">
                home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink className={addNavLinkClass} to="/phones">
                phones
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink className={addNavLinkClass} to="/tablets">
                tablets
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink className={addNavLinkClass} to="/accessories">
                accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.contentRight}>
        <div className={styles.verticalLine1}></div>

        <div className={classNames(styles.icon, styles.iconHeart)}>
          <NavLink className={addIconHeartLinkClass} to="/favourites">
            <div className={addIconCounterClass(favouritesItems)}>
              {countItems(favouritesItems)}
            </div>
          </NavLink>
        </div>

        <div className={styles.verticalLine2}></div>

        <div className={classNames(styles.icon, styles.iconCart)}>
          <NavLink className={addIconCartLinkClass} to="/cart">
            <div className={addIconCounterClass(cartItems)}>
              {countItems(cartItems)}
            </div>
          </NavLink>
        </div>

        <div className={classNames(styles.icon, styles.iconMenu)}>
          <Link
            className={classNames(styles.iconLink, styles.iconLinkMenu)}
            to="/menu"
            state={{ pathname }}
          />
        </div>
      </div>
    </div>
  );
};
