import { ProductCard } from '../ProductCard';
import styles from './ProductsList.module.scss';
import React from 'react';
import { UiProduct } from '../ProductsSlider/ProductSlider';

type Props = {
  products: UiProduct[];
};

export const ProductsList: React.FC<Props> = ({ products }) => (
  <div className={styles.list}>
    {products.map(p => (
      <ProductCard
        key={p.id}
        product={{
          id: p.id,
          title: p.title,
          img: p.img,
          price: p.price,
          oldPrice: p.oldPrice,
          year: p.year,
          screen: '',
          capacity: '',
          ram: '',
        }}
      />
    ))}
  </div>
);
