import React from 'react';
import { Product } from './../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

type ProductList = {
  gadgets: Product[];
};

export const ProductsList: React.FC<ProductList> = ({ gadgets }) => {
  return (
    <ul className={styles.list}>
      {gadgets?.map(gadget => (
        <li className={styles.element} key={gadget.id}>
          <ProductCard gadget={gadget} />
        </li>
      ))}
    </ul>
  );
};
