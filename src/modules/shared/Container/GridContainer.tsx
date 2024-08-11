import React, { ComponentPropsWithoutRef, FC } from 'react';
import cn from 'classnames';

import classes from './container.module.scss';

type Props = ComponentPropsWithoutRef<'div'>;

export const GridContainer: FC<Props> = ({ className, ...props }) => {
  return <div {...props} className={cn(classes.grid, className)} />;
};
