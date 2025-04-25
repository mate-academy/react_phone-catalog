import React from 'react';
import { Button } from '../Button/Button';
import style from './ChangeQttButton.module.scss';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const ChangeQttButton: React.FC<Props> = ({
  disabled,
  onClick,
  children,
}) => {
  return (
    <Button
      className={style.change_quantity}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
