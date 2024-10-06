import React from 'react';
import './CartList.module.scss';
import { Product } from '../../types/Product';
import { CartItem } from '../CartItem/CartItem';

type Props = {
  products: Product[];
};

export const CartList: React.FC<Props> = ({ products }) => {
  const shownProducts: Product[] = [];
  const ids: string[] = [];

  products.forEach((product: Product) => {
    if (!ids.includes(product.id)) {
      ids.push(product.id);
      shownProducts.push(product);
    }
  });

  return (
    <div className="CartList">
      {shownProducts.map(product => (
        <CartItem product={product} key={product.id} />
      ))}
    </div>
  );
};
