import React, { FC, ComponentPropsWithoutRef } from 'react';
import cn from 'classnames';

import { Variant } from './types';
import { PATH } from './variables';
import icons from './sprite.svg';
import classes from './icon.module.scss';

type Props = Exclude<ComponentPropsWithoutRef<'svg'>, 'children'> & {
  variant: Variant;
};

export const Icon: FC<Props> = ({ variant, className, ...props }) => {
  return (
    <svg {...props} className={cn(classes.icon, className)}>
      <use href={icons + PATH[variant]} />
    </svg>
  );
};
