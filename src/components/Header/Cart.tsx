import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export const Cart = ({ isNavOpen }: CartProps) => {
  return (
    <div className={cn({
      "cart": true,
      "cart__mobile": isNavOpen
    })}>
      <Link
        to="/"
        className="cart__button"
      />
    </div>
  );
};
