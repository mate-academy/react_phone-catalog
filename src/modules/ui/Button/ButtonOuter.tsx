import React, { FC, ComponentProps } from 'react';
import cn from 'classnames';

import classes from './button.module.scss';

type Variant = 'regular' | 'inversed';

export type Props = ComponentProps<'button'> & {
  variant?: Variant;
};

const VARIANT: Record<Variant, string> = {
  inversed: classes.button_inversed,
  regular: classes.button_regular,
};

export const ButtonOuter: FC<Props> = ({
  className,
  variant = 'regular',
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(classes.button, className, VARIANT[variant])}
    />
  );
};
