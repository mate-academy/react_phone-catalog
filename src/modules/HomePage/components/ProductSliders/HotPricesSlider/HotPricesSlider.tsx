import React, { useEffect, useState } from 'react';
import { SliderContainer } from '../shared/SliderContainer';
import { ProductForCard } from '../../../../../types/Product/Product';
import { fetchApi } from '../../../../../shared/api/fetchApi';

import styles from './HotPricesSlider.module.scss';

export const HotPricesSlider: React.FC = () => {
  const [hotPricesProducts, setHotPricesProducts] = useState<ProductForCard[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchApi<ProductForCard[]>('/products.json');
        const filteredProducts = products.filter(
          product => product.fullPrice > product.price,
        );

        const sortedProducts = filteredProducts.sort((a, b) => {
          const discountA = a.fullPrice - a.price;
          const discountB = b.fullPrice - b.price;

          return discountB - discountA;
        });

        setHotPricesProducts(sortedProducts);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.hotPrices}>
      <SliderContainer models={hotPricesProducts} title="Hot prices" />
    </div>
  );
};
