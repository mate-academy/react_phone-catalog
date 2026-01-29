import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import styles from './TabletsPage.module.scss';

export const TabletsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortType = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || '16';
  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.BASE_URL}api/products.json`)
      .then(response => response.json())
      .then((data: Product[]) => {
        // 👇 ZMIANA: Filtrujemy tablety
        const onlyTablets = data.filter(
          product => product.category === 'tablets',
        );

        setProducts(onlyTablets);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Search
    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      result = result.filter(product =>
        product.name.toLowerCase().includes(normalizedQuery),
      );
    }

    // 2. Sort
    result.sort((a, b) => {
      switch (sortType) {
        case 'age':
          return (b.year || 0) - (a.year || 0);
        case 'title':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    return result;
  }, [products, sortType, query]);

  const visibleProducts = useMemo(() => {
    if (perPage !== 'all') {
      const limit = Number(perPage);
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;

      return filteredAndSortedProducts.slice(startIndex, endIndex);
    }

    return filteredAndSortedProducts;
  }, [filteredAndSortedProducts, perPage, currentPage]);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 👇 ZMIENNE POMOCNICZE
  const totalItems = filteredAndSortedProducts.length;
  const itemsPerPage = Number(perPage);
  const shouldShowPagination = perPage !== 'all' && totalItems > itemsPerPage;

  return (
    <div className={styles.tabletsPage}>
      <div className="container">
        <Breadcrumbs />

        <header className={styles.header}>
          <h1 className={styles.title}>Tablets</h1>
          <p className={styles.modelsCount}>{totalItems} models</p>
        </header>

        {!isLoading && (
          <div className={styles.filters}>
            <Dropdown
              label="Sort by"
              value={sortType}
              onChange={newSort => {
                const newParams = new URLSearchParams(searchParams);

                newParams.set('sort', newSort);
                newParams.set('page', '1');
                setSearchParams(newParams);
              }}
              options={[
                { value: 'age', label: 'Newest' },
                { value: 'title', label: 'Alphabetically' },
                { value: 'price', label: 'Cheapest' },
              ]}
            />

            <Dropdown
              label="Items on page"
              value={perPage}
              onChange={newPerPage => {
                const newParams = new URLSearchParams(searchParams);

                newParams.set('perPage', newPerPage);
                newParams.set('page', '1');
                setSearchParams(newParams);
              }}
              options={[
                { value: '4', label: '4' },
                { value: '8', label: '8' },
                { value: '16', label: '16' },
                { value: '32', label: '32' },
                { value: 'all', label: 'All' },
              ]}
            />
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {visibleProducts.length > 0 ? (
              <ProductsList products={visibleProducts} />
            ) : (
              <p className={styles.noResults}>
                {query
                  ? `No tablets matching "${query}" found.`
                  : 'No tablets found.'}
              </p>
            )}

            {shouldShowPagination && (
              <div className={styles.paginationContainer}>
                <Pagination
                  total={totalItems}
                  perPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
