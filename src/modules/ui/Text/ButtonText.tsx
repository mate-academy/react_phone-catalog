import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import classes from './buttonText.module.scss';

type Props = ComponentProps<'span'>;

export const ButtonText: FC<Props> = ({ className, ...props }) => {
  return <span {...props} className={cn(classes.text, className)} />;
};
