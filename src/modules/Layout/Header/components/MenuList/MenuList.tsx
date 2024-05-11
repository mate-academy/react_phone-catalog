import React, { FC } from 'react';

import { MenuItem } from '../../types';
import { MenuItem as HeaderMenuItem } from '../MenuItem';
import classes from './menuList.module.scss';

type Props = {
  items: MenuItem[];
};

export const MenuList: FC<Props> = ({ items }) => {
  return (
    <ul className={classes.menu}>
      {items.map(({ key, ...item }) => (
        <HeaderMenuItem key={key} item={item} />
      ))}
    </ul>
  );
};
