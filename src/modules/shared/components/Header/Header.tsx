import React from 'react';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../../constants/navLinks';
import { Icon } from '../Icon/Icon';
import { icons } from '../../constants/icons';
import classNames from 'classnames';
import { BurgerMenu } from './BurgerMenu/BurgerMenu';

export const Header = () => {
  const getActiveItem = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__item, {
      [styles['header__item--active']]: isActive,
    });

  const getActiveIcon = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__icon, {
      [styles['header__icon--active']]: isActive,
    });

  return (
    <div className={styles.header}>
      <Link to="/" className={styles['header__logo-container']}>
        <Icon icon={icons.logo} className={styles.header__logo} />
      </Link>

      <div className={styles.header__menu}>
        <nav className={styles.header__list}>
          {navLinks.map(link => (
            <NavLink to={link.path} key={link.title} className={getActiveItem}>
              {link.title}
            </NavLink>
          ))}
        </nav>
        <BurgerMenu />
      </div>

      <div className={styles['header__buttons-right']}>
        <NavLink to="/favorites" className={getActiveIcon}>
          <div className={styles['header__icon-wrapper']}>
            <Icon icon={icons.favorites} />
          </div>
        </NavLink>

        <NavLink to="/cart" className={getActiveIcon}>
          <div className={styles['header__icon-wrapper']}>
            <Icon icon={icons.shopping_cart} />
          </div>
        </NavLink>
      </div>
    </div>
  );
};
