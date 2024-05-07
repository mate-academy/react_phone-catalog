import React, { ComponentProps, FC } from 'react';

import classes from './h4Text.module.scss';
import cn from 'classnames';

type Props = ComponentProps<'h4'>;

export const H4Text: FC<Props> = ({ className, ...props }) => {
  return <h4 {...props} className={cn(classes.text, className)} />;
};
