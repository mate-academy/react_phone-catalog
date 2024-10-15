import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.scss';
import React from 'react';
import cn from 'classnames';
import { MainNavigation } from '../../../../utils/constants';

const mainNav = [
  { title: 'Home', path: MainNavigation.HOME },
  { title: 'Phones', path: MainNavigation.PHONES },
  { title: 'Tablets', path: MainNavigation.TABLETS },
  { title: 'Accessories', path: MainNavigation.ACCESSORIES },
];

interface Props {
  className?: string;
}

export const Navigation: React.FC<Props> = ({ className }) => {
  return (
    <nav>
      <ul className={cn(styles.navigation__list, className)}>
        {mainNav.map(({ title, path }) => {
          return (
            <li className={styles.navigation__item} key={title}>
              <NavLink
                className={({ isActive }) =>
                  cn(styles.navigation__link, {
                    [styles['navigation__link--active']]: isActive,
                  })
                }
                to={path}
              >
                {title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
