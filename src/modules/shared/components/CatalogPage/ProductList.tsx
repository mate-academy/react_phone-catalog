import React from 'react';
import { Product } from '@/types/Product';
import { SliderItem } from '../SliderItem/SliderItem';
import styles from './CatalogPage.module.scss';

type ProductsListProps = {
  products: Product[];
};

export const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className={styles.catalog__container}>
      {products.map(product => (
        <SliderItem key={product.id} item={product} showDiscount={true} />
      ))}
    </div>
  );
};
