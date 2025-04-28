import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { Slider } from './components/Slider';
import { NewModels } from './components/NewModels';
import { Product } from '../../shared/types/Product';
import { Categories } from './components/Categories';
import { HotPrices } from './components/HotPrices';
import { Loader } from '../../components/Loader';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const response = await fetch(`api/products.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data: Product[] = await response.json();

      setProducts(data);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className={styles.HomePage}>
      {isLoading && (
        <Loader isLoading={isLoading} hasError={hasError} onReload={() => {}} />
      )}
      {!isLoading && !hasError && (
        <div className={styles.HomePage__content}>
          <div className={styles.HomePage__titleWrapper}>
            <h1 className={styles.HomePage__title}>
              <span className={styles.HomePage__line1}>Welcome to Nice </span>
              <span className={styles.HomePage__line2}>Gadgets store!</span>
            </h1>
          </div>

          <Slider className={styles.HomePage__slider} />
          <NewModels
            products={products || []}
            className={styles.HomePage__newModels}
          />
          <Categories
            products={products || []}
            className={styles.HomePage__categories}
          />
          <HotPrices
            products={products || []}
            className={styles.HomePage__hotPrices}
          />
        </div>
      )}
    </div>
  );
};
