import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProductsList } from '../../components/ProductsList';
import { useFavorites } from '../shared/context/FavoritesContext';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favoriteProducts } = useFavorites();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const visibleProducts = useMemo(() => {
    return favoriteProducts.filter(product => {
      return product.name.toLowerCase().includes(query);
    });
  }, [favoriteProducts, query]);

  return (
    <section>
      <h1>Favorites</h1>
      <p className={styles.count}>{favoriteProducts.length} items</p>

      {favoriteProducts.length === 0 ? (
        <p className={styles.message}>Your favorites list is empty</p>
      ) : visibleProducts.length === 0 ? (
        <p className={styles.message}>
          There are no products matching the query
        </p>
      ) : (
        <ProductsList products={visibleProducts} />
      )}
    </section>
  );
};
