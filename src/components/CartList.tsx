import cn from 'clsx';
import { CartItem } from './CartItem';
import { FC } from 'react';
import { Accessory, Phone, Tablet } from '../types';

type CartListProps = {
  products: Phone[] | Tablet[] | Accessory[];
  className?: string;
};

export const CartList: FC<CartListProps> = ({ products, className }) => {
  return (
    <ul className={cn('', className)}>
      {products.map(product => (
        <li key={product.id} className="">
          <CartItem product={product} className="" />
        </li>
      ))}
    </ul>
  );
};
