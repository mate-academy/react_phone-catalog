import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { NAV_LINKS } from '../../constants';
import { NavLinkItem } from '../../types';

import styles from './Navigation.module.scss';

type Props = {
  className?: string;
  isVertical?: boolean;
  onClick?: () => void;
};

export const Navigation: React.FC<Props> = ({
  className,
  isVertical = false,
  onClick,
}) => {
  return (
    <nav
      className={classNames(styles.nav, className, {
        [styles['nav--vertical']]: isVertical,
      })}
    >
      <ul
        className={classNames(styles.nav__list, {
          [styles['nav__list--vertical']]: isVertical,
        })}
      >
        {NAV_LINKS.map(({ path, name }: NavLinkItem) => (
          <li className={styles.nav__item} key={path}>
            <NavLink
              to={path}
              onClick={onClick}
              className={({ isActive }) =>
                classNames(styles.nav__link, {
                  [styles['nav__link--active']]: isActive,
                })
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
