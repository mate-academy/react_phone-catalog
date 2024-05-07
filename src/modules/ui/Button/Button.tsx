import React, { FC } from 'react';

import { ButtonOuter, Props } from './ButtonOuter';
import { Text } from '../Text';

export const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <ButtonOuter {...props}>
      <Text.Button>{children}</Text.Button>
    </ButtonOuter>
  );
};
