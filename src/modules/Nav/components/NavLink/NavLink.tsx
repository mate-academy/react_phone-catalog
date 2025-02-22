import React from 'react';
import { NavLinks } from '../../../../enums/NavLinks';
import { Link } from 'react-router-dom';
import styles from './NavLink.module.scss';
import classNames from 'classnames';

interface Props {
  item: NavLinks;
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
