import React, { useEffect, useState } from 'react';
import { SliderContainer } from '../shared/SliderContainer';
import { ProductForCard } from '../../../../../types/Product/Product';

import styles from './NewModelsSlider.module.scss';
import { fetchApi } from '../../../../../shared/api/fetchApi';

export const NewModelsSlider: React.FC = () => {
  const [newModels, setNewModels] = useState<ProductForCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchApi<ProductForCard[]>('/products.json');
        const filteredProducts = products.filter(
          product => product.year >= 2022,
        );

        setNewModels(filteredProducts);
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
    <div className={styles.newModels}>
      <SliderContainer models={newModels} title="Brand new models" />
    </div>
  );
};
