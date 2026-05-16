import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import style from './ProductList.module.scss';

type Props = { products: Product[] };

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul className={style.main}>
      {products.map(list => (
        <li key={list.id} className={style.items}>
          <ProductCard product={list} />
        </li>
      ))}
    </ul>
  );
};
