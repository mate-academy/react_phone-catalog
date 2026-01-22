import React, { useState, useEffect, useMemo } from 'react';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../../components/Loader/Loader';
import { Pagination } from '../../components/Pagination/Pagination';
import styles from './TabletsPage.module.scss';

export const TabletsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- STANY ---
  const [sortType, setSortType] = useState('age');
  const [perPage, setPerPage] = useState('16'); // Domyślnie 16, żeby widzieć efekt
  const [currentPage, setCurrentPage] = useState(1); // 👈 NOWY STAN: Strona

  useEffect(() => {
    fetch('/api/products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
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

  // Resetuj stronę na 1, gdy zmieniamy sortowanie lub ilość na stronie
  useEffect(() => {
    setCurrentPage(1);
  }, [sortType, perPage]);

  // --- LOGIKA SORTOWANIA I CIĘCIA STRON ---
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

    // 2. Paginacja (Wyświetlanie tylko fragmentu listy)
    if (perPage !== 'all') {
      const limit = Number(perPage);
      const startIndex = (currentPage - 1) * limit; // Np. strona 2: (2-1)*16 = 16
      const endIndex = startIndex + limit; // 16 + 16 = 32

      return result.slice(startIndex, endIndex);
    }

    return result;
  }, [products, sortType, perPage, currentPage]); // 👈 Dodane 'currentPage'

  return (
    <div className={styles.tabletsPage}>
      <div className="container">
        <Breadcrumbs />

        <header className={styles.header}>
          <h1 className={styles.title}>Tablets</h1>
          <p className={styles.modelsCount}>{products.length} models</p>
        </header>

        {!isLoading && (
          <div className={styles.filters}>
            {/* ... Tutaj Twoje selecty (Sort by, Items on page) bez zmian ... */}
            <div className={styles.filterGroup}>
              <label className={styles.label}>
                Sort by
                <select
                  value={sortType}
                  onChange={e => setSortType(e.target.value)}
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
                  <option value="4">4</option> {/* Dodałam 4 dla testu */}
                  <option value="8">8</option>
                  <option value="16">16</option>
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
              <p className={styles.noResults}>No tablets found.</p>
            )}

            {/* 👇 DODAJEMY PAGINACJĘ NA DOLE */}
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
