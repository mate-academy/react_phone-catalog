import React from 'react';
import { CartItem } from '../CartItem';
import { Product } from '../../../../types/ProductType';
import cartListClass from './cartList.module.scss';
import cn from 'classnames';

type Props = {
  cartProducts: Product[];
};

export const CartList: React.FC<Props> = React.memo(({ cartProducts }) => {
  return (
    <div className={cn(cartListClass['cart-list'])}>
      {cartProducts.map(product => (
        <CartItem key={product.id} product={product} />
      ))}
    </div>
  );
});

CartList.displayName = 'CartList';
