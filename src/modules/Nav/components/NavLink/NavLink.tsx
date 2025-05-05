import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import { MainNavLinks } from '../../../../enums/MainNavLinks';
import styles from './NavLink.module.scss';

interface Props {
  item: MainNavLinks;
  isActiveCondition: boolean;
  isOnHomePage: boolean;
}

export const NavLink: React.FC<Props> = React.memo(
  ({ item, isActiveCondition, isOnHomePage }) => {
    return (
      <li
        key={item}
        className={classNames(styles.item, {
          [styles['is-active']]: isActiveCondition || isOnHomePage,
        })}
      >
        <Link to={`/${item}`} className={styles.link}>
          {item}
        </Link>
      </li>
    );
  },
);

NavLink.displayName = 'NavLink';
