/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, SortBy, ItemsPerPage } from '../../types';
import { api } from '../../utils/api';
import { sortProducts } from '../../utils/helpers';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import { Filters } from './Filters';
import { Pagination } from '../AccessoriesPage/components/Pagination';
import { Search } from '../../components/Search';
import styles from './AccessoriesPage.module.scss';

export const AccessoriesPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useLocalStorage<SortBy>(
    'accessories-sort',
    'newest',
  );
  const [itemsPerPage, setItemsPerPage] = useLocalStorage<ItemsPerPage>(
    'accessories-per-page',
    '16',
  );

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const initialSort = (searchParams.get('sort') as SortBy) || 'newest';
  const initialItemsPerPage =
    (searchParams.get('perPage') as ItemsPerPage) || '16';
  const initialPage = searchParams.get('page')
    ? parseInt(searchParams.get('page')!, 10)
    : 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    if (isInitialLoad) {
      setSortBy(initialSort);
      setItemsPerPage(initialItemsPerPage);
      setCurrentPage(initialPage);
      setIsInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialLoad]);

  useEffect(() => {
    if (isInitialLoad) {
      return;
    }

    const newSearchParams = new URLSearchParams();

    if (sortBy !== 'newest') {
      newSearchParams.set('sort', sortBy);
    }

    if (itemsPerPage !== '16') {
      newSearchParams.set('perPage', itemsPerPage);
    }

    if (currentPage !== 1) {
      newSearchParams.set('page', currentPage.toString());
    }

    const currentParams = new URLSearchParams(searchParams);

    if (newSearchParams.toString() !== currentParams.toString()) {
      setSearchParams(newSearchParams, { replace: true });
    }
  }, [
    sortBy,
    itemsPerPage,
    currentPage,
    isInitialLoad,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProductsByCategory('accessories');

        setProducts(data);
      } catch (err) {
        setError('Failed to load accessories');
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

    if (!isInitialLoad) {
      setCurrentPage(1);
    }
  }, [products, sortBy, searchQuery, isInitialLoad]);

  const handleSortChange = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (newItemsPerPage: ItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
    <div className={styles.accessoriesPage}>
      <h1 className={styles.accessoriesPage__title}>Accessories</h1>
      <p className={styles.accessoriesPage__count}>{products.length} models</p>

      {/* Search */}
      <Search onSearch={setSearchQuery} placeholder="Search accessories..." />

      <div className={styles.accessoriesPage__controls}>
        <Filters
          sortBy={sortBy}
          itemsPerPage={itemsPerPage}
          onSortChange={handleSortChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={filteredProducts.length}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className={styles.accessoriesPage__empty}>
          <p>No accessories found</p>
        </div>
      ) : (
        <>
          <ProductsList products={paginatedProducts} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
