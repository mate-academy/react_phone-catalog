import React from 'react';
import { Button } from '../Button';
import './ChangeQuantityButton.scss';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export const ChangeQuantityButton: React.FC<Props> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <Button
      shape="round"
      className="change-quantity"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
