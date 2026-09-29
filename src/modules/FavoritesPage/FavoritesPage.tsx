import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useProducts } from '@/shared/context/ProductsContext';
import { processProducts } from '@/utils';
import { AsyncData } from '@/shared/components/AsyncData';

import { useFavorites } from '@/shared/context/FavoriteContext';

import { CatalogHeader } from '@/shared/components/CatalogHeader';
import { BreadcrumbsNav } from '@/shared/components/BreadcrumbsNav';
import { ProductsList } from '@/shared/components/ProductsList/ProductsList';
import { EmptyFavIcon } from '@/shared/assets/icons';
import { EmptyState } from '@/shared/components/EmptyState';

import { ThemeToggle } from '@/shared/components/ThemeToggle';
import './FavoritesPage.scss';

export const FavoritesPage = () => {
  const [searchParams] = useSearchParams();
  const { favorites } = useFavorites();
  const { isLoading, hasError, loadData } = useProducts();

  const query = searchParams.get('query') ?? undefined;

  const { totalCount, processedProducts } = useMemo(() => {
    return processProducts(favorites, { query });
  }, [favorites, query]);

  return (
    <div className="favorites-page container">
      <div className="favorites-page__top-bar">
        <BreadcrumbsNav isLoading={isLoading} />
        <ThemeToggle className="favorites-page__theme-btn" />
      </div>

      <CatalogHeader
        catalogName="Favorites"
        countProduct={totalCount}

        className="favorites-page__header"
      />

      <AsyncData hasError={hasError} onRetry={loadData}>
        {processedProducts.length > 0 || isLoading ? (
          <ProductsList
            products={processedProducts}
            isLoading={isLoading}
            skeletonCount={favorites.length || 3}
          />
        ) : (
          <EmptyState title="Your favorites list is empty">
            <EmptyFavIcon />
          </EmptyState>
        )}
      </AsyncData>
    </div>
  );
};
