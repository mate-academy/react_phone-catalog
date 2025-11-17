import React from 'react';
import { CartItem } from '../../contexts/CartContext';
import { CartRecord } from '../CartItem/CartRecord';

type Props = {
  items: CartItem[];
};

export const CartItemList: React.FC<Props> = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <CartRecord
          key={index}
          item={item}
          onIncrement={}
          onDecrement={}
          onRemove={}
        />
      ))}
    </div>
  );
};
