import React from 'react';
import { CartItem } from '../../contexts/CartContext';
import { CartRecord } from '../CartItem/CartRecord';

type Props = {
  items: CartItem[];
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
};

export const CartItemList: React.FC<Props> = ({
  items,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div>
      {items.map(item => (
        <CartRecord
          key={item.id}
          item={item}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};
