import React from 'react';
import { ProductItem } from './ProductItem';
import style from './ProductsList.module.scss';
import { Gadget } from './types/Gadget';
import { Product } from './types/Product';

type Props = {
  products: Product[] | Gadget[];
  discount?: boolean;
};

export const ProductsList: React.FC<Props> = ({ products, discount }) => {
  return (
    <div className={style.items}>
      {products.map(product => (
        <ProductItem product={product} key={product.id} discount={discount} />
      ))}
    </div>
  );
};
