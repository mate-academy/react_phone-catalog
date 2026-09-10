import styles from './FavoritesPage.module.scss';
import { Breadcrumbs } from '@/shared/components/Breadcrumbs';
import { PageError } from '@/shared/components/PageError';
import { PageHeader } from '@/shared/components/PageHeader';
import { PageLayout } from '@/shared/components/PageLayout';
import { ProductsList } from '@/shared/components/ProductsList';
// eslint-disable-next-line max-len
import { ProductsListSkeleton } from '@/shared/components/ProductsList/components/ProductsListSkeleton';
import { useFavoritesState } from '@/shared/hooks/useFavoritesState';
import { useProducts } from '@/shared/hooks/useProducts';
import React, { useMemo } from 'react';

export const FavoritesPage = () => {
  const productsState = useProducts();
  const favoritesState = useFavoritesState();

  const favorites = useMemo(
    () =>
      productsState.products.filter(product =>
        favoritesState.includes(product.id),
      ),
    [favoritesState, productsState.products],
  );

  const headerElement = (
    <PageHeader
      title="Favourites"
      productsCount={favorites.length}
      productsName="items"
      isLoading={productsState.isLoading}
    />
  );

  let content: React.ReactNode = null;

  if (productsState.isLoading) {
    content = <ProductsListSkeleton hasFilters={false} hasPagination={false} />;
  } else if (productsState.hasError) {
    content = <PageError reloadFunction={productsState.retryFetch} />;
  } else if (favorites.length === 0) {
    content = (
      <div className={styles.emptyMessageContainer}>
        <h2 className={styles.emptyMessage}>Your favourites is empty</h2>
      </div>
    );
  } else {
    content = <ProductsList products={favorites} hasFilters={false} />;
  }

  return (
    <PageLayout topNav={<Breadcrumbs />} header={headerElement}>
      {content}
    </PageLayout>
  );
};
