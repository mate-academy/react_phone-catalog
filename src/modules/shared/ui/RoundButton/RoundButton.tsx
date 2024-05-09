import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import classes from './roundButton.module.scss';

type Props = ComponentProps<'button'>;

export const RoundButton: FC<Props> = ({ className, children, ...props }) => {
  return (
    <button {...props} className={cn(classes.button, className)}>
      <div className={classes.button__inner}>{children}</div>
    </button>
  );
};
