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

export const RadioButtonSquareWithText: FC<Props> = ({
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
      className={cn(classes.radioButtonWithTextSquare, className)}
      htmlFor={id}
    >
      <input
        {...props}
        type="radio"
        name={name || spareName}
        id={id}
        className={classes.radioButtonWithTextSquare__input}
      />
      <Text className={classes.radioButtonWithTextSquare__tag}>{children}</Text>
    </label>
  );
};
