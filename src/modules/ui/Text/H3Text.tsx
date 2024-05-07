import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import classes from './h3Text.module.scss';

type Props = ComponentProps<'h3'>;

export const H3Text: FC<Props> = ({ className, ...props }) => {
  return <h3 {...props} className={cn(classes.text, className)} />;
};
