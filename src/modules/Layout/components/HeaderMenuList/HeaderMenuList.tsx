import React, { FC } from 'react';

import { MenuItem } from '../../types';
import { HeaderMenuItem } from '../HeaderMenuItem';
import classes from './headerMenuList.module.scss';

type Props = {
  items: MenuItem[];
};

export const HeaderMenuList: FC<Props> = ({ items }) => {
  return (
    <ul className={classes.menu}>
      {items.map(item => (
        <HeaderMenuItem key={item.text} item={item} />
      ))}
    </ul>
  );
};
