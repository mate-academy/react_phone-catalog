import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '@shared/types';
import { getProducts } from '@shared/api';
import { useFavourites, useTranslation } from '@shared/context';
import { filterProductsByQuery } from '@shared/utils';
import { Breadcrumbs } from '@shared/components/Breadcrumbs';
import { ProductsList } from '@shared/components/ProductsList';
import { ProductsListSkeleton } from '@shared/components/ProductsListSkeleton';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const { favouriteIds } = useFavourites();
  const { t, tCount } = useTranslation();
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const query = searchParams.get('query') || '';

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(loadProducts, [loadProducts]);

  // Favourites keep the order they were added in.
  const favouriteProducts = useMemo(
    () =>
      favouriteIds
        .map(id => products.find(product => product.itemId === id))
        .filter((product): product is Product => Boolean(product)),
    [favouriteIds, products],
  );

  const matchingProducts = useMemo(
    () => filterProductsByQuery(favouriteProducts, query),
    [favouriteProducts, query],
  );

  return (
    <div className={styles.page}>
      <Breadcrumbs crumbs={[{ title: t('favourites.title') }]} />

      <h1 className={styles.title}>{t('favourites.title')}</h1>

      {isLoading && (
        <div className={styles.list}>
          <ProductsListSkeleton count={4} />
        </div>
      )}

      {!isLoading && hasError && (
        <div className={styles.message}>
          <p>{t('common.somethingWentWrong')}</p>

          <button
            type="button"
            className={styles.reloadButton}
            onClick={loadProducts}
          >
            {t('common.reload')}
          </button>
        </div>
      )}

      {!isLoading && !hasError && !favouriteProducts.length && (
        <p className={styles.message}>{t('favourites.empty')}</p>
      )}

      {!isLoading && !hasError && !!favouriteProducts.length && (
        <>
          <p className={styles.count}>
            {tCount('items', matchingProducts.length)}
          </p>

          {matchingProducts.length ? (
            <div className={styles.list}>
              <ProductsList products={matchingProducts} />
            </div>
          ) : (
            <p className={styles.message}>{t('products.noMatch.products')}</p>
          )}
        </>
      )}
    </div>
  );
};
