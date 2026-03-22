import React, { useState } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { ProductCard } from '@/modules/shared/components/ProductCard';
import { Breadcrumbs } from '@/modules/shared/ui/Breadcrumbs';
import { Heading } from '@/modules/shared/ui/Heading';
import styles from './FavoritesPage.module.scss';
import { Pagination } from '../shared/ui/Pagination';
import { EmptyState } from '../shared/components/EmptyState';
import emptyFavorite from '@/assets/img/Emptyfavorite.jpg';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentFavorites = favorites.slice(firstItemIndex, lastItemIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shouldShowPagination = favorites.length > itemsPerPage;

  if (favorites.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState
          title="empty.favorites.title"
          text="empty.favorites.text"
          imgUrl={emptyFavorite}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs pageName="Favorites" />
      <div className={styles.header}>
        <Heading as="h1" className={styles.title}>
          Favorites
        </Heading>
        <p className={styles.count}>{favorites.length} items</p>
      </div>

      {favorites.length > 0 ? (
        <div className={styles.content}>
          {currentFavorites.map(product => (
            <div key={product.itemId} className={styles.content__item}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>Your favorites list is empty</h2>
          <p className={styles.emptyText}>
            Go back to the store and find something you love!
          </p>
        </div>
      )}

      {shouldShowPagination && (
        <Pagination
          total={favorites.length}
          perPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
