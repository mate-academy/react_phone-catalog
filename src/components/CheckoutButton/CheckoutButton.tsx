import React from 'react';
import style from './CheckoutButton.module.scss';
import { Button } from '../Button/Button';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export const CheckoutButton: React.FC<Props> = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} className={style.checkout_button}>
      {children}
    </Button>
  );
};
