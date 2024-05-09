import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import classes from './container.module.scss';

type Props = ComponentProps<'div'>;

export const GridContainer: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={cn(classes.container, classes.container_grid, className)}
    />
  );
};
