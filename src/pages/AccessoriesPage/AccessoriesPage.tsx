import React, { useState, useEffect } from 'react';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import styles from './AccessoriesPage.module.scss';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
        // ZMIANA TUTAJ: Filtrujemy po 'accessories'
        const onlyAccessories = data.filter(
          product => product.category === 'accessories',
        );

        setAccessories(onlyAccessories);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.breadcrumbs}>Home &gt; Accessories</p>
        <h1 className="title">Accessories</h1>
        <p className={styles.modelsCount}>{accessories.length} models</p>
      </div>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <ProductsList products={accessories} />
      )}
    </div>
  );
};
