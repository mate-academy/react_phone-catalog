import React, { useEffect, useState } from 'react';
import { Product } from '../../types';
import { loadProducts } from '../../api/products';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { PicturesSlider } from './components/PicturesSlider';
import { Loader } from '../shared/components/Loader';
import { Categories } from './components/Categories';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  const [product, setProduct] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts()
      .then(setProduct)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>
      <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
      {isLoading && <Loader />}
      <PicturesSlider />

      {product.length > 0 && (
        <ProductsSlider
          title="Brand new models"
          products={[...product].sort((a, b) => b.year - a.year).slice(0, 10)}
          showDiscount={false}
        />
      )}
      <Categories products={product} />

      {product.length > 0 && (
        <ProductsSlider
          title="Hot prices"
          products={[...product]
            .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
            .slice(0, 10)}
        />
      )}
    </div>
  );
};
