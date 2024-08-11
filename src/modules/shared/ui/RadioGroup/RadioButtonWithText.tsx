/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  ComponentPropsWithoutRef,
  FC,
  PropsWithChildren,
  useContext,
} from 'react';
import cn from 'classnames';

import { Text } from '../Text';
import { RadioContext } from './RadioContext';
import classes from './radioGroup.module.scss';

type Props = PropsWithChildren<ComponentPropsWithoutRef<'input'>>;

export const RadioButtonWithText: FC<Props> = ({
  id,
  className,
  style,
  name,
  children,
  ...props
}) => {
  const spareName = useContext(RadioContext);

  return (
    <label
      style={style}
      className={cn(classes.radioButtonWithText, className)}
      htmlFor={id}
    >
      <input
        {...props}
        type="radio"
        name={name || spareName}
        id={id}
        className={classes.radioButtonWithText__input}
      />
      <Text className={classes.radioButtonWithText__tag}>{children}</Text>
    </label>
  );
};
