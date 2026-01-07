import React, { useState, useEffect } from 'react';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import styles from './PhonesPage.module.scss';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
        // Wybieramy tylko telefony
        const onlyPhones = data.filter(
          product => product.category === 'phones',
        );

        setPhones(onlyPhones);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.phonesPage}>
      <div className={styles.header}>
        {/* Tu w przyszłości będą Breadcrumbs (nawigacja okruszkowa) */}
        <p className={styles.breadcrumbs}>Home &gt; Phones</p>

        <h1 className="title">Mobile phones</h1>
        <p className={styles.modelsCount}>{phones.length} models</p>
      </div>

      {isLoading ? <h1>Loading...</h1> : <ProductsList products={phones} />}
    </div>
  );
};
