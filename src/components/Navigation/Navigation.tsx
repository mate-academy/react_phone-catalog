import React from 'react';

import styles from './Navigation.module.scss';
import { navLinks } from '../../constantas/navLinks';
import { NavLinkItem } from '../NavLinkItem';

type Props = {};

export const Navigation: React.FC<Props> = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        {navLinks.slice(0, 4).map(linkItem => {
          return (
            <li
              className={styles.nav__item}
              key={linkItem.path}
              onClick={() => {
                window.scrollTo({ top: 0 });
              }}
            >
              <NavLinkItem path={linkItem.path} text={linkItem.text} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
