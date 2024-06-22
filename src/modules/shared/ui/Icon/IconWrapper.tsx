import React, { FC, ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';

import classes from './icon.module.scss';

type Props = ComponentPropsWithoutRef<'div'>;

export const IconWrapper: FC<Props> = ({ className, ...props }) => {
  return <div {...props} className={cn(classes.icon, className)} />;
};
