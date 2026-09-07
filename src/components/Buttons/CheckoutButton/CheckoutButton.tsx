import React from 'react';
import { Button } from '../Button';
import './CheckoutButton.scss';

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};

export const CheckoutButton: React.FC<Props> = ({ children, onClick }) => (
  <Button onClick={onClick} className="checkout-button typography__button-text">
    {children}
  </Button>
);
