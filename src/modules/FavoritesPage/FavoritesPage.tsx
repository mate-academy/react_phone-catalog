import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsList } from '../../components/ProductsList';
import { ProductsSkeleton } from '../../components/ProductsSkeleton';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage } from '../../context/LanguageContext';
import { Product } from '../../types/Product';
import { matchesSearchQuery } from '../../utils/matchesSearchQuery';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('query') ?? '').trim().toLowerCase();

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(data => {
        if (!isCancelled) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [reloadKey]);

  const favoriteProducts = useMemo(() => {
    const favoriteIdSet = new Set(favoriteIds);

    return products.filter(product => favoriteIdSet.has(product.itemId));
  }, [favoriteIds, products]);

  const filteredFavoriteProducts = useMemo(
    () =>
      favoriteProducts.filter(product =>
        matchesSearchQuery(product.name, query),
      ),
    [favoriteProducts, query],
  );

  const hasNoQueryMatches =
    Boolean(query) && filteredFavoriteProducts.length === 0;
  const hasNoFavorites = !query && favoriteProducts.length === 0;

  return (
    <div className={styles.favoritesPage}>
      <div className={`container ${styles.container}`}>
        <Breadcrumbs currentPage={t('favorites.title')} />

        <h1 className={styles.title}>{t('favorites.title')}</h1>
        <p className={styles.count}>
          {t('favorites.items', { count: filteredFavoriteProducts.length })}
        </p>

        {isLoading && (
          <div className={styles.products}>
            <ProductsSkeleton />
          </div>
        )}

        {!isLoading && hasError && (
          <div className={styles.messageBlock}>
            <p>{t('common.somethingWrong')}</p>
            <button type="button" onClick={() => setReloadKey(key => key + 1)}>
              {t('common.reload')}
            </button>
          </div>
        )}

        {!isLoading && !hasError && hasNoQueryMatches && (
          <div className={styles.messageBlock}>
            <p>{t('favorites.noMatches')}</p>
          </div>
        )}

        {!isLoading && !hasError && hasNoFavorites && (
          <div className={styles.messageBlock}>
            <p>{t('favorites.empty')}</p>
          </div>
        )}

        {!isLoading && !hasError && filteredFavoriteProducts.length > 0 && (
          <div className={styles.products}>
            <ProductsList products={filteredFavoriteProducts} />
          </div>
        )}
      </div>
    </div>
  );
};
