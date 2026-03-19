import cn from 'clsx';
import { CartItem } from './CartItem';
import { FC } from 'react';
import { CartProduct } from '../../../types';

type CartListProps = {
  products: CartProduct[];
  className?: string;
};

export const CartList: FC<CartListProps> = ({ products, className }) => {
  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {products.map(product => (
        <li key={product.itemId} className="">
          <CartItem product={product} className="" />
        </li>
      ))}
    </ul>
  );
};
