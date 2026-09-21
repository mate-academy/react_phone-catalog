import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../api/products';
import { ProductsList } from '../shared/components/ProductsList/ProductsList';
import { Pagination } from '../shared/components/Pagination/Pagination';
import { Loader } from '../shared/components/Loader/Loader';
import styles from './ProductsPage.module.scss';

interface Props {
  category: string;
}

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const loadData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProductsByCategory(category)
      .then(data => {
        setProducts(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('sort', e.target.value);
    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextParams = new URLSearchParams(searchParams);
    const val = e.target.value;

    if (val === 'all') {
      nextParams.delete('perPage');
    } else {
      nextParams.set('perPage', val);
    }

    nextParams.delete('page');
    setSearchParams(nextParams);
  };

  const handlePageChange = (newPage: number) => {
    const nextParams = new URLSearchParams(searchParams);

    if (newPage === 1) {
      nextParams.delete('page');
    } else {
      nextParams.set('page', String(newPage));
    }

    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase();

    if (!trimmedQuery) {
      return products;
    }

    return products.filter(p => p.name.toLowerCase().includes(trimmedQuery));
  }, [products, query]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];

    if (sortBy === 'newest' || sortBy === 'age') {
      return list.sort((a, b) => b.year - a.year);
    }

    if (sortBy === 'alphabetically') {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === 'cheapest') {
      return list.sort((a, b) => a.price - b.price);
    }

    return list;
  }, [filteredProducts, sortBy]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const itemsPerPage = Number(perPage);
    const start = (currentPage - 1) * itemsPerPage;

    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, perPage, currentPage]);

  const getTitle = () => {
    switch (category) {
      case 'phones':
        return 'Mobile phones';
      case 'tablets':
        return 'Tablets';
      case 'accessories':
        return 'Accessories';
      default:
        return 'Products';
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{getTitle()}</h1>
      <p className={styles.subtitle}>{sortedProducts.length} models</p>

      {isLoading && <Loader />}

      {hasError && !isLoading && (
        <div className={styles.messageBox}>
          <p className={styles.errorText}>Something went wrong</p>
          <button type="button" onClick={loadData} className={styles.reloadBtn}>
            Reload
          </button>
        </div>
      )}

      {!isLoading && !hasError && sortedProducts.length === 0 && (
        <div className={styles.messageBox}>
          <p className={styles.emptyText}>
            {query
              ? 'There are no products matching the query'
              : `There are no ${category} yet`}
          </p>
        </div>
      )}

      {!isLoading && !hasError && sortedProducts.length > 0 && (
        <>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label htmlFor="sort" className={styles.label}>
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className={styles.select}
              >
                <option value="age">Newest</option>
                <option value="alphabetically">Alphabetically</option>
                <option value="cheapest">Cheapest</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="perPage" className={styles.label}>
                Items on page
              </label>
              <select
                id="perPage"
                value={perPage}
                onChange={handlePerPageChange}
                className={styles.select}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>

          <ProductsList products={visibleProducts} />

          {perPage !== 'all' && (
            <Pagination
              total={sortedProducts.length}
              perPage={Number(perPage)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
