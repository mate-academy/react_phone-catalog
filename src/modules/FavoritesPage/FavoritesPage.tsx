import { useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { getProducts } from '../shared/api/apiClient';
import { useAsync } from '../shared/hooks/useAsync';
import { useFavorites } from '../shared/context';
import { Loader } from '../shared/components/Loader';
import { ProductsList } from '../shared/components/ProductsList';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('query') ?? '').trim().toLowerCase();

  const fetchProducts = useCallback(() => getProducts(), []);
  const { data: products, loading, error, reload } = useAsync(fetchProducts);

  const favoriteProducts = useMemo(
    () => (products ?? []).filter(p => favorites.includes(p.itemId)),
    [products, favorites],
  );
  const filteredFavorites = useMemo(() => {
    if (!query) {
      return favoriteProducts;
    }

    return favoriteProducts.filter(product =>
      product.name.toLowerCase().includes(query),
    );
  }, [favoriteProducts, query]);

  if (favorites.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Favorites</h1>
        <div className={styles.empty}>
          <p className={styles.emptyText}>You have no favorite items yet.</p>
          <Link to="/phones" className={styles.emptyLink}>
            Browse Phones
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.page}>
        <p className={styles.errorText}>
          Something went wrong: {String(error)}
        </p>
        <button type="button" onClick={reload}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Favorites</h1>
      <p className={styles.count}>{filteredFavorites.length} items</p>

      {filteredFavorites.length === 0 && query ? (
        <p className={styles.noResults}>
          There are no products matching the query
        </p>
      ) : (
        <ProductsList products={filteredFavorites} />
      )}
    </div>
  );
};
