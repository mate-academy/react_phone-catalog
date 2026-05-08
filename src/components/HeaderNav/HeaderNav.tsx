import React from 'react';
import styles from './HeaderNav.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';

export const HeaderNav = () => {
  const getActiveLink = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.nav__link, { [styles['nav__link--active']]: isActive });

  const getActiveTab = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.nav__icon, { 'nav__icon--active': isActive });

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav__container}>
          <ul className={styles.nav__list}>
            <li>
              <NavLink to="/" className={getActiveLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/phones" className={getActiveLink}>
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink to="/tablets" className={getActiveLink}>
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink to="/accessories" className={getActiveLink}>
                Accessories
              </NavLink>
            </li>
          </ul>
          <div className={styles.icons}>
            <NavLink to="/favourites" className={getActiveTab}>
              <Icon name="favourites" />
            </NavLink>
            <NavLink to="/cart" className={getActiveTab}>
              <Icon name="cart" />
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};
