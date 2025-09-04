import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './PhonesPage.module.scss';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';
import { ProductFilters } from '../Filter';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';

export const PhonesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'age';

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(false);

      const response = await fetch('/api/products.json');

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data: Product[] = await response.json();
      const phones = data.filter(item => item.category === 'phones');

      setProducts(phones);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Something went wrong</p>
        <button onClick={fetchProducts}>Reload</button>
      </div>
    );
  }

  if (products.length === 0) {
    return <div className={styles.empty}>There are no phones yet</div>;
  }

  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'age':
      default:
        return b.year - a.year;
    }
  });

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <h1 className={styles.title}>Phones page</h1>
      <p className={styles.counter}>{products.length} models</p>
      <ProductFilters />

      <div className={styles.list}>
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
