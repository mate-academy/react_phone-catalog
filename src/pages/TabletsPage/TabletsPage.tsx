import React, { useState, useEffect } from 'react';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import styles from './TabletsPage.module.scss'; // Zaraz stworzymy ten plik

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
        // ZMIANA TUTAJ: Filtrujemy po 'tablets'
        const onlyTablets = data.filter(
          product => product.category === 'tablets',
        );

        setTablets(onlyTablets);
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
        <p className={styles.breadcrumbs}>Home &gt; Tablets</p>
        <h1 className="title">Tablets</h1>
        <p className={styles.modelsCount}>{tablets.length} models</p>
      </div>

      {isLoading ? <h1>Loading...</h1> : <ProductsList products={tablets} />}
    </div>
  );
};
