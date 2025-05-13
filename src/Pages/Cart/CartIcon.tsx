import React from 'react';
import { useCartContext } from './../../CartContext/useCartContext';
import { Link } from 'react-router-dom';

export const CartIcon: React.FC = () => {
  const { cartCount } = useCartContext();

  return (
    <Link
      to="/cart"
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '24px 24px',
      }}
    >
      <img
        src="./img/cart.png"
        alt="Cart"
        width="24"
        height="24"
      />
      {cartCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: 20,
            right: 15,
            background: 'red',
            color: 'white',
            borderRadius: '100%',
            padding: '5px',
            fontSize: '8px',
          }}
        >
          {cartCount}
        </span>
      )}
    </Link>
  );
};
