import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import classes from './bodyText.module.scss';

type Props = ComponentProps<'p'>;

export const BodyText: FC<Props> = ({ className, ...props }) => {
  return <p {...props} className={cn(classes.text, className)} />;
};
