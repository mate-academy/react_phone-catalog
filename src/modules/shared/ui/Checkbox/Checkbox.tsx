import React, { ComponentPropsWithoutRef, FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import classes from './checkbox.module.scss';

type Props = PropsWithChildren<ComponentPropsWithoutRef<'input'>>;

export const Checkbox: FC<Props> = ({
  style,
  className,
  children,
  id,
  title,
  ...props
}) => {
  return (
    <label
      style={style}
      className={cn(classes.checkbox, className)}
      htmlFor={id}
      title={title}
    >
      <input
        {...props}
        type="checkbox"
        id={id}
        className={classes.checkbox__input}
      />
      <div className={classes.checkbox__tag}>
        <div className={classes.checkbox__inner}>{children}</div>
      </div>
    </label>
  );
};
