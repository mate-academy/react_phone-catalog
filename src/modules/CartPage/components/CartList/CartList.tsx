import React from 'react';

import { CartItem } from '@/shared/types';
import { CartProduct } from '../CartProduct/CartProduct';
// eslint-disable-next-line max-len
import { CartProductSkeleton } from '../CartProductSkeleton/CartProductSkeleton';

import cn from 'classnames';
import './CartList.scss';

type Props = {
  cartItems: CartItem[];
  className?: string;
  totalCount?: number;
  isLoading?: boolean;
};
export const CartList: React.FC<Props> = ({
  cartItems,
  className,
  totalCount,
  isLoading,
}) => {
  const skeletonCount =
    totalCount !== undefined && totalCount > 0 ? totalCount : 3;

  return (
    <ul className={cn('cart-list', className)}>
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <li key={`skeleton-${index}`} className="cart-list__item">
              <CartProductSkeleton />
            </li>
          ))
        : cartItems.map(item => (
            <li key={item.product.id} className="cart-list__item">
              <CartProduct item={item} />
            </li>
          ))}
    </ul>
  );
};
