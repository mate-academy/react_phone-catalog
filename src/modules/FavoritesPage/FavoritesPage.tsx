import React, { useState, useEffect, useMemo } from 'react';
import { SortBy, ItemsPerPage } from '../../types';
import { sortProducts } from '../../utils/helpers';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import { useFavorites } from '../../contexts/FavoritesContext';
import { ProductsList } from '../../components/ProductsList';
import { Search } from '../../components/Search';
import { Filters } from './components/Filters/Filters';
import { Pagination } from '../AccessoriesPage/components/Pagination';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: React.FC = () => {
  const { state } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useLocalStorage<SortBy>(
    'favorites-sort',
    'newest',
  );
  const [itemsPerPage, setItemsPerPage] = useLocalStorage<ItemsPerPage>(
    'favorites-per-page',
    '16',
  );

  const products = useMemo(() => {
    return state.items.map(item => item.product);
  }, [state.items]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return sortProducts(filtered, sortBy);
  }, [products, searchQuery, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

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

  if (products.length === 0) {
    return (
      <div className={styles.favoritesPage}>
        <h1 className={styles.favoritesPage__title}>Favorites</h1>
        <div className={styles.favoritesPage__empty}>
          <img
            src="/img/product-not-found.png"
            alt="No favorites"
            className={styles.favoritesPage__emptyImage}
          />
          <p className={styles.favoritesPage__emptyText}>
            No favorite products yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.favoritesPage__title}>Favorites</h1>
      <p className={styles.favoritesPage__count}>{products.length} items</p>

      <div className={styles.favoritesPage__controls}>
        <Search onSearch={setSearchQuery} placeholder="Search favorites..." />

        <Filters
          sortBy={sortBy}
          itemsPerPage={itemsPerPage}
          onSortChange={setSortBy}
          onItemsPerPageChange={setItemsPerPage}
          totalItems={filteredProducts.length}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className={styles.favoritesPage__empty}>
          <p>No favorites match your search</p>
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
