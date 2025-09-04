import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getProducts } from '../../services/products';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import React from 'react';
import styles from './HotPrices.module.scss';

export const HotPrices = () => {
  const [hotDeals, setHotDeals] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(productsFromServer => {
      const sortedByPrice = productsFromServer.sort(
        (a, b) => b.price - a.price,
      );

      setHotDeals(sortedByPrice.slice(0, 10));
    });
  }, []);

  return (
    <section className={styles.hotPrices}>
      <div className={styles.container}>
        <ProductsSlider title="Hot prices" products={hotDeals} />
      </div>
    </section>
  );
};
