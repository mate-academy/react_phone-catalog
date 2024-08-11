import React, { ComponentPropsWithoutRef, FC } from 'react';

import classes from './skeleton.module.scss';
import cn from 'classnames';

type Props = ComponentPropsWithoutRef<'div'>;

export const Skeleton: FC<Props> = ({ className, ...props }) => {
  return <div {...props} className={cn(classes.skeleton, className)} />;
};
