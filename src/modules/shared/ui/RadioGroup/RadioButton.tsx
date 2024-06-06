/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ComponentProps, FC, useContext } from 'react';
import cn from 'classnames';

import { RadioContext } from './context';
import classes from './radioGroup.module.scss';

type Props = ComponentProps<'input'>;

export const RadioButton: FC<Props> = ({
  id,
  className,
  style,
  name,
  ...props
}) => {
  const spareName = useContext(RadioContext);

  return (
    <label
      style={style}
      className={cn(classes.radioButton, className)}
      htmlFor={id}
    >
      <input
        {...props}
        type="radio"
        name={name || spareName}
        id={id}
        className={classes.radioButton__input}
      />
      <span className={classes.radioButton__tag} />
    </label>
  );
};
