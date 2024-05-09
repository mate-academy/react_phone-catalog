import React, { FC } from 'react';

import { MenuItem } from '../../types';
import { FooterMenuItem } from '../FooterMenuItem';
import classes from './footerMenuList.module.scss';

type Props = {
  items: MenuItem[];
};

export const FooterMenuList: FC<Props> = ({ items }) => {
  return (
    <ul className={classes.menu}>
      {items.map(({ key, ...item }) => (
        <FooterMenuItem key={key} item={item} />
      ))}
    </ul>
  );
};
