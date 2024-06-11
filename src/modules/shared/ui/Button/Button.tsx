import React, { FC } from 'react';

import { Text } from '../Text';
import { ButtonOuter, Props } from './ButtonOuter';

export const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <ButtonOuter {...props}>
      <Text.Button element="span">{children}</Text.Button>
    </ButtonOuter>
  );
};
