import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Text } from '../../../../shared/ui/Text';
import { MenuItem } from '../../types';
import classes from './footerMenuItem.module.scss';

type Props = {
  item: Omit<MenuItem, 'key'>;
};

export const FooterMenuItem: FC<Props> = ({ item: { to, text } }) => {
  return (
    <li className={classes.menuItem}>
      <Link className={classes.menuItem__link} to={to}>
        <Text variant="uppercase">{text}</Text>
      </Link>
    </li>
  );
};
