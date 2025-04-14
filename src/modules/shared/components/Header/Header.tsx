import React from 'react';

import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Header: React.FC = () => (
  <header className={styles.header}>
    <Link to={'/'} className={styles.headerLogoLink}>
      <img
        className={styles.headerLogo}
        src="/img/header-logo.png"
        alt="Nice gadgets logo"
      />
    </Link>

    <nav className={styles.nav}>
      <ul className={classNames(styles.navList, styles.textList)}>
        <li className={styles.navItem}>
          <NavLink to={'/'} className={classNames('link', styles.navLinkText)}>
            home
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to={'/'} className={classNames('link', styles.navLinkText)}>
            Phones
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to={'/'} className={classNames('link', styles.navLinkText)}>
            tablets
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to={'/'} className={classNames('link', styles.navLinkText)}>
            accessories
          </NavLink>
        </li>
      </ul>

      <ul className={classNames(styles.navList, styles.iconList)}>
        <li className={styles.navItem}>
          <NavLink
            to={'/'}
            className={classNames(
              'link',
              styles.navLinkIcon,
              styles.favourites,
            )}
          ></NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to={'/'}
            className={classNames('link', styles.navLinkIcon, styles.cart)}
          ></NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to={''}
            className={classNames(
              'link',
              styles.navLinkIcon,
              styles.burgerMenu,
            )}
          ></NavLink>
        </li>
      </ul>
    </nav>
  </header>
);
