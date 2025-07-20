import { useEffect, useState, type FC } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../components/Product/ProductCard';
import { useCartActionsStore } from '../../hooks/useCartAndFavorites';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import type { Product } from '../../types/product';
import styles from './FavouritesPage.module.scss';
import { SkeletonCard } from '../../components/Skeleton';

export const FavouritesPage: FC = () => {
  const { favoritesValues, loadFromStorage } = useCartActionsStore();
  const { products, isLoading } = useFetchProducts();
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    const normalized = products.map((product: Product) => ({
      ...product,
      id: product.itemId,
    }));

    setAllProducts(normalized);
  }, [products]);

  const favouriteProducts = allProducts.filter((product) =>
    favoritesValues.includes(product.id),
  );

  const skeletonCount = 4;

  return (
    <div className={styles.favorites}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs lastItemNameOverride="Favourites" />
      </div>

      <h1 className={styles.title}>Favourites</h1>

      <p className={styles.count}>{favouriteProducts.length} items</p>

      {isLoading ?
        <div className={styles.grid}>
          {Array.from({ length: skeletonCount }, (_, index) => (
            <div
              className={styles.card}
              key={index}
            >
              <SkeletonCard width={styles.width} />
            </div>
          ))}
        </div>
      : favouriteProducts.length === 0 ?
        <div className={styles.empty}>
          <p>The favorite is empty!</p>
        </div>
      : <div className={styles.grid}>
          {favouriteProducts.map((product) => (
            <div
              className={styles.cardWrapper}
              key={product.id}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      }
    </div>
  );
};
