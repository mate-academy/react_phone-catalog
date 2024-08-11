import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { MenuItem } from '../../types';
import { Text } from '../../../shared/ui/Text';
import classes from './headerMenuItem.module.scss';

type Props = {
  item: MenuItem;
};

export const HeaderMenuItem: FC<Props> = ({ item: { text, to } }) => {
  return (
    <li className={classes.menuItem}>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          cn(classes.menuItem__link, {
            [classes.menuItem__link_active]: isActive,
          })
        }
      >
        <Text.Uppercase>{text}</Text.Uppercase>
      </NavLink>
    </li>
  );
};
