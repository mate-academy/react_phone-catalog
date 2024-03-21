import React, { memo } from 'react';

import { CartItem } from '../../utils/Cart';

import { CartCard } from '../CartCard';

import './CartList.scss';

type Props = {
  items: CartItem[];
};

export const CartList: React.FC<Props> = memo(({ items }) => {
  return (
    <ul className="CartList">
      {items.map(item => (
        <li key={item.id} className="CartList__item">
          <CartCard item={item} />
        </li>
      ))}
    </ul>
  );
});
