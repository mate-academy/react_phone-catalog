import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import classes from './h1Text.module.scss';

type Props = ComponentProps<'h1'>;

export const H1Text: FC<Props> = ({ className, ...props }) => {
  return <h1 {...props} className={cn(classes.text, className)} />;
};
