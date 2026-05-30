import React, { useState } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { ProductCard } from '@/modules/shared/components/ProductCard';
import { Breadcrumbs } from '@/modules/shared/ui/Breadcrumbs';
import { Heading } from '@/modules/shared/ui/Heading';
import styles from './FavoritesPage.module.scss';
import { Pagination } from '../shared/ui/Pagination';
import { EmptyState } from '../shared/components/EmptyState';
import emptyFavorite from '@/assets/img/Emptyfavorite.jpg';
import { useTranslation } from 'react-i18next';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const itemsPerPage = 12;

  // --- PAGINATION LOGIC ---
  // Calculating the slice of the favorites array to display on the current page
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentFavorites = favorites.slice(firstItemIndex, lastItemIndex);

  // --- HANDLERS ---
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shouldShowPagination = favorites.length > itemsPerPage;

  // --- CONDITIONAL RENDERING: GLOBAL EMPTY STATE ---
  // Shown when the user hasn't added any products to favorites yet
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
      <Breadcrumbs pageName={t('favorites.title')} />

      <div className={styles.header}>
        <Heading as="h1" className={styles.title}>
          {t('favorites.title')}
        </Heading>
        <p className={styles.count}>
          {favorites.length} {t('favorites.items', { count: favorites.length })}
        </p>
      </div>

      <div className={styles.content}>
        {currentFavorites.map(product => (
          <div key={product.itemId} className={styles.content__item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

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
