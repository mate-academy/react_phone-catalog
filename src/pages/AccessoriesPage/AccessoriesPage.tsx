import React, { useState, useEffect, useMemo } from 'react';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination'; // 👈 Importujemy Paginację
import styles from './AccessoriesPage.module.scss';

export const AccessoriesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- STANY ---
  const [sortType, setSortType] = useState('age');
  const [perPage, setPerPage] = useState('16');
  const [currentPage, setCurrentPage] = useState(1); // 👈 Stan obecnej strony

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
        // Filtrujemy tylko akcesoria
        const onlyAccessories = data.filter(
          product => product.category === 'accessories',
        );

        setProducts(onlyAccessories);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Resetujemy stronę na 1, gdy zmieniamy sortowanie lub ilość na stronie
  useEffect(() => {
    setCurrentPage(1);
  }, [sortType, perPage]);

  // --- LOGIKA ---
  const visibleProducts = useMemo(() => {
    const result = [...products];

    // 1. Sortowanie
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

    // 2. Paginacja
    if (perPage !== 'all') {
      const limit = Number(perPage);
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;

      return result.slice(startIndex, endIndex);
    }

    return result;
  }, [products, sortType, perPage, currentPage]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value);
  };

  return (
    <div className={styles.accessoriesPage}>
      <div className="container">
        <Breadcrumbs />

        <header className={styles.header}>
          <h1 className={styles.title}>Accessories</h1>
          <p className={styles.modelsCount}>{products.length} models</p>
        </header>

        {!isLoading && (
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label className={styles.label}>
                Sort by
                <select
                  value={sortType}
                  onChange={handleSortChange}
                  className={styles.select}
                >
                  <option value="age">Newest</option>
                  <option value="title">Alphabetically</option>
                  <option value="price">Cheapest</option>
                </select>
              </label>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.label}>
                Items on page
                <select
                  value={perPage}
                  onChange={e => setPerPage(e.target.value)}
                  className={styles.select}
                >
                  <option value="all">All</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="32">32</option>
                </select>
              </label>
            </div>
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {visibleProducts.length > 0 ? (
              <ProductsList products={visibleProducts} />
            ) : (
              <p className={styles.noResults}>No accessories found.</p>
            )}

            {/* 👇 Komponent Paginacji */}
            <div className={styles.paginationContainer}>
              <Pagination
                total={products.length}
                perPage={perPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
