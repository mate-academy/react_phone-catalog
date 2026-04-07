import { useEffect, useState } from 'react';
import type { Product } from '@/types/Product';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductsList } from '../ProductsList';
import { Loader } from '../Loader';
import styles from './CatalogPage.module.scss';

type Category = 'phones' | 'tablets' | 'accessories';

type Props = {
  category: Category;
  title: string;
};

export const CatalogPage = ({ category, title }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    setError(false);
    setIsLoading(true);

    fetch('/api/products.json', { signal: controller.signal })
      .then<Product[]>(res => res.json())
      .then(data => {
        setProducts(data.filter(p => p.category === category));
        setIsLoading(false);
      })
      .catch(err => {
        if (!(err instanceof DOMException && err.name === 'AbortError')) {
          setError(true);
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [category, retryCount]);

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: title }]} />
      <h1 className={styles.title}>{title}</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className={styles.error}>
          <p>Something went wrong</p>
          <button
            className={styles.reloadButton}
            onClick={() => setRetryCount(c => c + 1)}
          >
            Reload
          </button>
        </div>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <>
          <p className={styles.count}>{products.length} models</p>
          <ProductsList products={products} />
        </>
      )}
    </div>
  );
};
