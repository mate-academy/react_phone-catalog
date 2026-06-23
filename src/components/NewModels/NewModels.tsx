import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/products';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import styles from './NewModels.module.scss';

export const NewModels = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(productsFromServer => {
      const sortedByYear = [...productsFromServer].sort(
        (a, b) => b.year - a.year,
      );

      setProducts(sortedByYear.slice(0, 10));
    });
  }, []);

  return (
    <section className={styles.newModels}>
      <div className={styles.container}>
        <ProductsSlider title="Brand new models" products={products} />
      </div>
    </section>
  );
};
