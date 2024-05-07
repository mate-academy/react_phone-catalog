import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import classes from './h2Text.module.scss';

type Props = ComponentProps<'h2'>;

export const H2Text: FC<Props> = ({ className, ...props }) => {
  return <h2 {...props} className={cn(classes.text, className)} />;
};
