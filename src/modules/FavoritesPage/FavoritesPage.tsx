import React, { useCallback, useEffect, useState } from 'react';
import favoritesPageStyles from './FavoritesPage.module.scss';
import { ProductList } from '../../components/ProductList';
import { useFavorites } from '../../context/FavoriteContext';
import { Product } from '../../types/Product';
import { getProductsByIds } from '../../services/products';
import { useLoading } from '../../context/LoadingContext';
import { useNotification } from '../../context/NotificationContext';
import { handleErrorMessage } from '../../utils/handleErrorMessage';
import { ErrorFallback } from '../../components/ErrorFallback/ErrorFallback';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const { startLoading, stopLoading } = useLoading();
  const { addNotification } = useNotification();
  const [isHasError, setIsHasError] = useState(false);

  const loadProducts = useCallback(() => {
    startLoading();
    getProductsByIds(favorites)
      .then(productsFromServer =>
        setProducts(
          favorites
            .map(id =>
              productsFromServer.find(product => product.itemId === id),
            )
            .filter((product): product is Product => product !== undefined),
        ),
      )
      .catch(err => {
        addNotification(
          'error',
          handleErrorMessage(err, 'Failed to load products.'),
        );
        setIsHasError(true);
      })
      .finally(() => stopLoading());
  }, [favorites, startLoading, stopLoading, addNotification]);

  useEffect(() => loadProducts(), [loadProducts]);

  return (
    <section className={favoritesPageStyles.favorites}>
      <div className={favoritesPageStyles.favorites__header}>
        <h2 className={favoritesPageStyles.favorites__title}>Favorites</h2>
        <p className={favoritesPageStyles.favorites__subtitle}>
          {isHasError
            ? `${favorites.length} saved items - failed to load`
            : `${favorites.length} models`}
        </p>
      </div>
      {isHasError ? (
        <ErrorFallback onRetry={loadProducts} />
      ) : (
        <ProductList products={products} />
      )}
    </section>
  );
};
