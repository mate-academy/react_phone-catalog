import React from 'react';
import { Button, ButtonProps } from '../Button';

export const IconButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button isSquare {...props}>
    {children}
  </Button>
);
