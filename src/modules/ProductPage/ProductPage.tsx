import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Pagetoolbar } from '../../components/layout/Pagetoolbar';
import { ProductCard } from '../../components/layout/ProductCard';
import { Pagination } from '../../components/ui/Pagination';
import {
  catalogTitles,
  itemsOnPageOptions,
  sortByOptions,
} from '../../store/constants';
import { Filter, FilterParams, FilterValue, Product } from '../../types/types';

import 'react-loading-skeleton/dist/skeleton.css';
import styles from './ProductPage.module.scss';
import { CardSkeleton } from '../../components/layout/ProductCard/skeleton';
import { getCategoryOfProducts } from '../../api/products';

export const ProductPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getCategoryOfProducts(category);

        setProducts(data);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [category]);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || null;
  const perPage = searchParams.get('perPage') || null;
  const page = searchParams.get('page') || null;

  const start = (Number(page) - 1) * Number(perPage);
  const end = Math.min(start + Number(perPage), products.length);

  const handleSorting = (value: FilterValue, filter: FilterParams) => {
    const params = new URLSearchParams(searchParams);

    if (value === null) {
      params.delete(filter);
    } else {
      params.set(filter, String(value));
    }

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const filters: Filter[] = [
    {
      title: 'Sort by',
      value: sortBy,
      onChange: value => handleSorting(value, 'sort'),
      options: sortByOptions,
      placeholder: 'Maybe newest?',
    },
    {
      title: 'Items on page',
      value: perPage,
      onChange: value => handleSorting(value, 'perPage'),
      options: itemsOnPageOptions,
    },
  ];

  const filteredItems = () => {
    const sorted = [...products];

    switch (sortBy) {
      case 'year':
        sorted.sort((a, b) => b.year - a.year);

        break;
      case 'alph':
        sorted.sort((a, b) => a.name.localeCompare(b.name));

        break;
      case 'price':
        sorted.sort((a, b) => b.price - a.price);

        break;
      default:
        break;
    }

    if (perPage !== null && page !== null) {
      return sorted.slice(start, end);
    }

    return sorted;
  };

  return (
    <section className={styles.container}>
      <Pagetoolbar
        breadcrumbs
        title={catalogTitles[category ?? ''] ?? 'Catalog'}
        subtitle={isLoading ? 'Loading ...' : `${products.length} models`}
        filters={filters}
        clearFilters={clearFilters}
      />

      {isLoading ? (
        <div className={styles.content}>
          {Array.from({ length: 16 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filteredItems().length === 0 ? (
        <div className={styles.empty}>
          <h2 className={styles.empty__title}>:(</h2>
          <p className={styles.empty__subtitle}>There are no {category} yet</p>
        </div>
      ) : (
        <div className={styles.content}>
          {filteredItems().map(product => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </div>
      )}

      {perPage !== null && (
        <div className={styles.footer}>
          <Pagination itemsAmount={products.length} />
        </div>
      )}
    </section>
  );
};
