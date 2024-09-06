import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './menuItems.module.scss';

import { IMenuLink } from './menu-item.interface';

interface IMenuItem {
  item: IMenuLink;
}

const MenuItems: FC<IMenuItem> = ({ item }) => {
  return (
    <li>
      <NavLink
        to={item.link}
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        {item.name}
      </NavLink>
    </li>
  );
};

export default MenuItems;
