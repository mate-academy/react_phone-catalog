import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { ProductsList } from '../../components/ProductsList';
import { useProducts } from '../../context/ProductsContext';
import { Product } from '../../types/Product';
import styles from './CatalogPage.module.scss';

type Category = 'phones' | 'tablets' | 'accessories';

interface Props {
  category: Category;
  title: string;
  breadcrumb: string;
}

const sortProducts = (items: Product[], sortBy: string) => {
  return [...items].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'age':
      default:
        return b.year - a.year;
    }
  });
};

export const CatalogPage: React.FC<Props> = ({
  category,
  title,
  breadcrumb,
}) => {
  const { products, isLoading, error, reload } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort') || 'age';
  const sortBy = sortParam === 'name' ? 'title' : sortParam;
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const categoryProducts = useMemo(
    () => products.filter(item => item.category === category),
    [products, category],
  );

  const sortedProducts = useMemo(
    () => sortProducts(categoryProducts, sortBy),
    [categoryProducts, sortBy],
  );

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage) || 16;
  const total = sortedProducts.length;

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const start = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage, perPage]);

  const updateParams = (key: string, value: string, resetPage = false) => {
    const nextParams = new URLSearchParams(searchParams);

    const isDefault =
      (key === 'page' && value === '1') ||
      (key === 'perPage' && value === 'all');

    if (isDefault) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    if (resetPage) {
      nextParams.delete('page');
    }

    setSearchParams(nextParams);
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: breadcrumb }]} />

      <h1 className={styles.title}>{title}</h1>
      {!isLoading && <p className={styles.count}>{total} models</p>}

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor={`${category}-sort`} className={styles.label}>
            Sort by
          </label>
          <select
            id={`${category}-sort`}
            className={styles.select}
            value={sortBy}
            onChange={event => updateParams('sort', event.target.value, true)}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.filterGroupSmall}>
          <label htmlFor={`${category}-per-page`} className={styles.label}>
            Items on page
          </label>
          <select
            id={`${category}-per-page`}
            className={styles.select}
            value={perPage}
            onChange={event =>
              updateParams('perPage', event.target.value, true)
            }
          >
            <option value="16">16</option>
            <option value="8">8</option>
            <option value="4">4</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {isLoading && <Loader />}

      {!isLoading && error && (
        <div>
          <p className={styles.status}>{error}</p>
          <button type="button" className={styles.retryBtn} onClick={reload}>
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && visibleProducts.length === 0 && (
        <p className={styles.status}>There are no {category} yet</p>
      )}

      {!isLoading && !error && visibleProducts.length > 0 && (
        <ProductsList products={visibleProducts} />
      )}

      {!isLoading && !error && perPage !== 'all' && total > itemsPerPage && (
        <Pagination
          total={total}
          perPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={page => updateParams('page', String(page))}
        />
      )}
    </div>
  );
};
