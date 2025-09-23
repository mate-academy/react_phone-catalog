/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect } from 'react';
import { Product, SortBy, ItemsPerPage } from '../../types';
import { api } from '../../utils/api';
import { sortProducts } from '../../utils/helpers';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Search } from '../../components/Search';
import { Filters } from '../AccessoriesPage/Filters';
import { Pagination } from '../AccessoriesPage/components/Pagination';
import styles from './TabletsPage.module.scss';

export const TabletsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useLocalStorage<SortBy>('tablets-sort', 'newest');
  const [itemsPerPage, setItemsPerPage] = useLocalStorage<ItemsPerPage>(
    'tablets-per-page',
    '16',
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProductsByCategory('tablets');

        setProducts(data);
      } catch (err) {
        setError('Failed to load tablets');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    filtered = sortProducts(filtered, sortBy);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchQuery, sortBy]);

  const itemsPerPageNumber =
    itemsPerPage === 'all' ? filteredProducts.length : parseInt(itemsPerPage);
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
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  return (
    <div className={styles.tabletsPage}>
      <h1 className={styles.tabletsPage__title}>Tablets</h1>
      <p className={styles.tabletsPage__count}>{products.length} models</p>

      <div className={styles.tabletsPage__controls}>
        <Search onSearch={setSearchQuery} placeholder="Search tablets..." />

        <Filters
          sortBy={sortBy}
          itemsPerPage={itemsPerPage}
          onSortChange={setSortBy}
          onItemsPerPageChange={setItemsPerPage}
          totalItems={filteredProducts.length}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className={styles.tabletsPage__empty}>
          <p>No tablets found</p>
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
