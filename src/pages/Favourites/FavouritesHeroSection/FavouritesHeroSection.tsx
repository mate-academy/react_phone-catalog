import { Breadcrumbs } from '@/components/UI/Breadcrumbs';
import styles from './FavouritesHeroSection.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import {
  FavoritesContext,
  FavoritesContextType,
} from '@/context/FavoritesContext';
import { ProductCard } from '@/components/UI/ProductCard';
import { ProductSkeleton } from '@/components/UI/ProductSkeleton';

export const FavouritesHeroSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { favorites } = useContext(FavoritesContext) as FavoritesContextType;

  useEffect(() => {
    const times = setTimeout(() => {
      setIsLoading(false);
    }, 100)

    return () => clearTimeout(times);
  }, [favorites]);

  return (
    <>
      <Breadcrumbs />
      <div className={styles.container}>
        <h1 className={styles.title}>Favourites</h1>
        <p className={styles.counterModels}>{favorites.length} items</p>

        <div className={styles.productGridContainer}>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={styles.productItem}>
                <ProductSkeleton />
              </div>
            ))
          ) : favorites.length > 0 ? (
            favorites.map(product => (
              <div key={product.itemId} className={styles.productItem}>
                <ProductCard isShowFullPrice={true} product={product} />
              </div>
            ))
          ) : (
            <div className={styles.emptyStateContainer}>
              <p className={styles.noItemsMessage}>
                Your favorites list is empty.
              </p>
              <img
                src="img/cart-is-empty.png"
                alt="Favourites is empty"
                className={styles.favouritesNotFoundImg}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
