import React, { useEffect, useState } from 'react';
import { useFavorites } from '../../context/FavouritesContext';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import styles from './FavoritesPage.module.scss';
import { Loader } from '../../components/Loader/Loader';

interface ProductItem {
  id: string;
  itemId: string;
  category: string;
  name: string;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
  price: number;
  fullPrice: number;
  priceRegular?: number;
  priceDiscount?: number;
}

export const FavoritesPage: React.FC = () => {
  const { favoriteIds } = useFavorites();
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => {
        if (!res.ok) {
          throw new Error(
            'Failed to load favorite products. Please try again later.',
          );
        }

        return res.json();
      })
      .then(data => setAllProducts(data))
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 500),
      );
  }, []);

  const favoriteProducts = allProducts.filter(product => {
    const pId = String(product.id);
    const pItemId = product.itemId ? String(product.itemId) : '';

    return favoriteIds.some(
      favId => String(favId) === pId || String(favId) === pItemId,
    );
  });

  if (error) {
    return (
      <div className={styles.favoritesPage}>
        <h2 className={styles.errorMessage}>{error}</h2>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.favoritesPageTitle}>Favorites</h1>
      <p className={styles.favoritesPageCount}>
        {favoriteProducts.length} items
      </p>

      {favoriteProducts.length > 0 ? (
        <div className={styles.favoritesPageGrid}>
          {favoriteProducts.map(item => {
            const finalPrice =
              item.priceDiscount || item.price || item.priceRegular || 0;
            const finalFullPrice =
              item.fullPrice || item.priceRegular || finalPrice;

            return (
              <ProductCard
                key={item.id}
                itemId={item.itemId || item.id}
                category={item.category}
                image={item.image}
                title={item.name}
                price={finalPrice}
                fullPrice={finalFullPrice}
                screen={item.screen}
                capacity={item.capacity}
                ram={item.ram}
              />
            );
          })}
        </div>
      ) : (
        <p className={styles.favoritesPageEmpty}>
          Your favorites list is empty
        </p>
      )}
    </div>
  );
};
