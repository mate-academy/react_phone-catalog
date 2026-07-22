import classNames from 'classnames';

import React from 'react';
import styles from './Nav.module.scss';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from './constants/navItems';
import { useTranslation } from 'react-i18next';

type Props = {
  isMobile?: boolean;
};

export const Nav: React.FC<Props> = ({ isMobile = false }) => {
  const { t } = useTranslation();

  return (
    <nav
      className={classNames(styles.nav, {
        [styles.navMobile]: isMobile,
      })}
    >
      <ul
        className={classNames(styles.navList, {
          [styles.navListMobile]: isMobile,
        })}
      >
        {NAV_ITEMS.map(item => (
          <li key={item.to} className={styles.navItem}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                classNames(styles.navLink, {
                  [styles.isActive]: isActive,
                  [styles.navLinkMobile]: isMobile,
                })
              }
            >
              {t(item.translationKey)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
