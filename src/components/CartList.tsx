import cn from 'clsx';
import { CartItem } from './CartItem';
import { FC } from 'react';
import { Product } from '../types';

type CartListProps = {
  products: Product[];
  className?: string;
};

export const CartList: FC<CartListProps> = ({ products, className }) => {
  return (
    <ul className={cn('flex flex-col gap-[16px]', className)}>
      {products.map(product => (
        <li key={product.id} className="">
          <CartItem product={product} className="" />
        </li>
      ))}
    </ul>
  );
};
