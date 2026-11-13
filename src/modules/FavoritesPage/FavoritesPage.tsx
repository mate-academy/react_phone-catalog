import { useEffect, useState } from 'react';
import { getDetailedProducts } from '../../api/productsApi';
import { Product } from '../../api/types';
import { ProductsList } from '../../shared/ProductsList';
import { Loader } from '../../shared/Loader';
import { useShop } from '../../context/ShopContext';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage = () => {
  const { favorites } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setHasError(false);

    getDetailedProducts()
      .then(items => {
        if (cancelled) {
          return;
        }

        setProducts(items.filter(item => favorites.includes(item.id)));
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setHasError(true);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [favorites]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Favourites</h1>
      {!isLoading && !hasError && (
        <p className={styles.itemsCount}>{products.length} items</p>
      )}
      {isLoading ? (
        <Loader count={4} />
      ) : hasError ? (
        <p className={styles.error}>Something went wrong</p>
      ) : (
        <ProductsList
          products={products}
          emptyMessage="Your favorites list is empty"
        />
      )}
    </div>
  );
};
