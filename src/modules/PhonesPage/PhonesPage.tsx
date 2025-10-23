/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect } from 'react';
import { Product, SortBy, ItemsPerPage } from '../../types';
import { api } from '../../utils/api';
import { sortProducts } from '../../utils/helpers';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Filters } from '../../modules/AccessoriesPage/Filters';
import { Pagination } from '../AccessoriesPage/components/Pagination';
import styles from './PhonesPage.module.scss';

export const PhonesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useLocalStorage<SortBy>('phones-sort', 'newest');
  const [itemsPerPage, setItemsPerPage] = useLocalStorage<ItemsPerPage>(
    'phones-per-page',
    '16',
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await api.getProductsByCategory('phones');

        setProducts(data);
      } catch (err) {
        setError('Failed to load phones');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    filtered = sortProducts(filtered, sortBy);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, sortBy]);

  const itemsPerPageNumber =
    itemsPerPage === 'all'
      ? filteredProducts.length
      : parseInt(itemsPerPage, 10);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPageNumber);

  const paginatedProducts =
    itemsPerPage === 'all'
      ? filteredProducts
      : filteredProducts.slice(
          (currentPage - 1) * itemsPerPageNumber,
          currentPage * itemsPerPageNumber,
        );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button type="button" onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.phonesPage}>
      <h1 className={styles.phonesPage__title}>Mobile phones</h1>
      <p className={styles.phonesPage__count}>{products.length} models</p>

      <div className={styles.phonesPage__controls}>
        <Filters
          sortBy={sortBy}
          itemsPerPage={itemsPerPage}
          onSortChange={setSortBy}
          onItemsPerPageChange={setItemsPerPage}
          totalItems={filteredProducts.length}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className={styles.phonesPage__empty}>
          <p>No phones found</p>
        </div>
      ) : (
        <>
          <ProductsList products={paginatedProducts} />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};
