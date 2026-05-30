import React from 'react';
import style from './ProductList.module.scss';
import { Products } from '../../types/Types';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Products[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul className={style.productList}>
      {products.map(product => (
        <li key={product.itemId} className={style.productList__item}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
