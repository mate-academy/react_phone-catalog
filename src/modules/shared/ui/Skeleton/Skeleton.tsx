import React, { ComponentProps, FC } from 'react';

import classes from './skeleton.module.scss';
import cn from 'classnames';

type Props = ComponentProps<'div'>;

export const Skeleton: FC<Props> = ({ className, ...props }) => {
  return <div {...props} className={cn(classes.skeleton, className)} />;
};
