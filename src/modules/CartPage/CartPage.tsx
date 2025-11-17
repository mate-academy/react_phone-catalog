import React from 'react';
import { CartRecord } from '../../shared/components/CartItem/CartRecord';
import { CartItem } from '../../shared/contexts/CartContext';

const demoItem: CartItem = {
  id: 1,
  name: 'Demo iPhone',
  image: '/img/phones/apple-iphone-14-pro.webp',
  price: 999,
  quantity: 1,
  capacity: '128GB',
  color: 'Silver',
};

export const CartPage: React.FC = () => {
  return (
    <section>
      <CartRecord
        item={demoItem}
        onIncrement={() => {}}
        onDecrement={() => {}}
        onRemove={() => {}}
      />
    </section>
  );
};
