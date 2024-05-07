import React, { FC, ComponentProps } from 'react';
import cn from 'classnames';

import { Variant } from './types';
import { VARINAT } from './constants';
import icons from './sprite.svg';
import classes from './icon.module.scss';

type Props = Exclude<ComponentProps<'svg'>, 'children'> & {
  variant: Variant;
};

export const Icon: FC<Props> = ({ variant, className, ...props }) => {
  return (
    <svg {...props} className={cn(classes.icon, className)}>
      <use href={icons + VARINAT[variant]} />
    </svg>
  );
};
