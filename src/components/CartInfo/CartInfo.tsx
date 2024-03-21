import React, { memo } from 'react';

import { CartItem } from '../../utils/Cart';

import { CartList } from '../CartList';
import { CartActions } from '../CartActions';

import './CartInfo.scss';

type Props = {
  cartItems: CartItem[];
};

export const CartInfo: React.FC<Props> = memo(({ cartItems }) => {
  return (
    <section className="CartInfo">
      <article className="CartInfo__cartList">
        <CartList items={cartItems} />
      </article>

      <article className="CartInfo__cartActions">
        <CartActions items={cartItems} />
      </article>
    </section>
  );
});
