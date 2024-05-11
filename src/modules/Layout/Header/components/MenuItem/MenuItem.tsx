import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Text } from '../../../../shared/ui/Text';
import { MenuItem } from '../../types';
import classes from './menuItem.module.scss';

type Props = {
  item: Omit<MenuItem, 'key'>;
};

export const HeaderMenuItem: FC<Props> = ({ item: { text, to } }) => {
  return (
    <li className={classes.menuItem}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(classes.menuItem__link, {
            [classes.menuItem__link_active]: isActive,
          })
        }
      >
        <Text variant="uppercase">{text}</Text>
      </NavLink>
    </li>
  );
};
