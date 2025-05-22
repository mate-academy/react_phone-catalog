import React, { memo } from 'react';
import cartListStyles from './CartList.module.scss';
import { CartItem } from '../CartItem/CartItem';
import { CartItemDetails } from '../../../../types/CartItemDetails';
import classNames from 'classnames';

type Props = {
  products: CartItemDetails[];
  className?: string;
};

export const CartList: React.FC<Props> = memo(({ products, className }) => {
  return (
    <div className={classNames(className, cartListStyles.cartList)}>
      <ul className={cartListStyles.cartList__list}>
        {products.map(product => (
          <li key={product.id} className={cartListStyles.cartList__item}>
            <CartItem product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
});

CartList.displayName = 'CartList';
