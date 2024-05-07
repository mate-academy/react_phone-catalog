import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import classes from './uppercaseText.module.scss';

type Props = ComponentProps<'p'>;

export const UppercaseText: FC<Props> = ({ className, ...props }) => {
  return <p {...props} className={cn(classes.text, className)} />;
};
