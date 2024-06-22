import React, { ComponentPropsWithoutRef, FC } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Icon } from '../ui/Icon';
import { Text } from '../ui/Text';
import classes from './linkBack.module.scss';

type Props = Omit<ComponentPropsWithoutRef<typeof Link>, 'to'>;

export const LinkBack: FC<Props> = ({ children, className, ...props }) => {
  return (
    <Link {...props} to={-1 as any} className={cn(classes.linkBack, className)}>
      <Icon className={classes.linkBack__icon} variant="arrow-left" />
      <Text.Small>{children ? children : 'Back'}</Text.Small>
    </Link>
  );
};
