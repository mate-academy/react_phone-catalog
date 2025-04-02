import React from 'react';
import { useCartContext } from '../../CartContext/CartContext';
import { Link } from 'react-router-dom';
// import iconc from '/public/img/cart.png';

export const CartIcon: React.FC = () => {
  const { cartCount } = useCartContext();

  return (
    <Link to="/cart" style={{ position: 'relative', display: 'inline-block' }}>
      <img src="/img/cart.png" alt="Cart" width="24" height="24" />
      {cartCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: 2,
            right: -7,
            background: 'red',
            color: 'white',
            borderRadius: '50%',
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
