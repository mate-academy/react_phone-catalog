/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ComponentPropsWithoutRef, FC, useContext } from 'react';
import cn from 'classnames';

import { RadioContext } from './RadioContext';
import classes from './radioGroup.module.scss';

type Props = ComponentPropsWithoutRef<'input'>;

export const RadioButton: FC<Props> = ({
  id,
  className,
  style,
  name,
  title,
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
      <span className={classes.radioButton__tag} title={title} />
    </label>
  );
};
