import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './AccessoriesPage.module.scss';
import { Product } from '../../types/Product';
import { Loader } from '../Loader/Loader';
import { ProductFilters } from '../Filter';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { Pagination } from '../Pagination';

export const AccessoriesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const productsPerPage = searchParams.get('perPage') || '16';
  const sort = searchParams.get('sort') || 'age';
  const currentPage = Number(searchParams.get('page')) || 1;
  const [isFirstRender, setIsFirstRender] = useState(true);

  const setCurrentPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', String(page));
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);

      return;
    }

    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', '1');
    setSearchParams(newParams);
  }, [productsPerPage, sort]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(false);

      const response = await fetch('./api/products.json');

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data: Product[] = await response.json();
      const accessories = data.filter(item => item.category === 'accessories');

      await new Promise(resolve => setTimeout(resolve, 700));

      setProducts(accessories);
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
        <button onClick={fetchProducts} className={styles.button}>
          Reload
        </button>
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

  const lastIndex = currentPage * +productsPerPage;
  const firstIndex = lastIndex - +productsPerPage;
  const currentProducts = sortedProducts.slice(firstIndex, lastIndex);

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <h1 className={styles.title}>Accessories page</h1>
      <p className={styles.counter}>{products.length} models</p>
      <ProductFilters />

      <div className={styles.list}>
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        total={products.length}
        perPage={+productsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
