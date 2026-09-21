import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard, Product } from '../../components/ProductCard';
import styles from './AccessoriesPage.module.scss';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        const accessoryProducts = data.filter(
          item => item.category === 'accessories',
        );

        setAccessories(accessoryProducts);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error('Failed to load accessories:', err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <img src="img/icons/home.svg" alt="Home" />
        </Link>
        <span>›</span>
        <span>Accessories</span>
      </div>

      <h1 className={styles.title}>Accessories</h1>
      <p className={styles.subtitle}>{accessories.length} models</p>

      {isLoading ? (
        <div>Loading accessories...</div>
      ) : accessories.length > 0 ? (
        <div className={styles.productsGrid}>
          {accessories.map(accessory => (
            <ProductCard key={accessory.id} product={accessory} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyMessage}>
          No accessories available at the moment.
        </div>
      )}
    </div>
  );
};
