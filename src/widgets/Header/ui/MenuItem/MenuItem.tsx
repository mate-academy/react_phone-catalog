import React from 'react';
import { NavLink } from 'react-router-dom';
import { IMenuItem } from './menu-item.interface';
import styles from './MenuItem.module.scss';
import classNames from 'classnames';

type Props = {
  item: IMenuItem,
  onClick: () => void,
};

export const MenuItem: React.FC<Props> = ({ item, onClick }) => {
  return (
    <li>
      <NavLink
        to={item.link}
        className={({ isActive }) => (
          classNames(styles.link, { [styles.active]: isActive })
        )}
        onClick={onClick}
      >
        {item.name}
      </NavLink>
    </li>
  );
};
