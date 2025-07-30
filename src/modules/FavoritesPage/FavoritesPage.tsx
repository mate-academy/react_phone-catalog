import { useEffect, useState } from 'react';

import styles from './FavoritesPage.module.scss';

import { CurrentPage } from '../../shared/components/CurrentPage';
import { ProductCard } from '../../shared/components/ProductCard';
import { useLocation } from 'react-router-dom';
import { SkeletonProduct } from '../../shared/components/SkeletonProduct';
import { useAppSelector } from '../../store/hooks';

export const FavoritesPage = () => {
  const favoritesProduct = useAppSelector(state => state.favorites);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = new Promise(resolve => setTimeout(resolve, 600));

    timer.then(() => {
      setIsLoading(false);
    });
  }, [pathname]);

  return (
    <main className={styles.favorites}>
      <div className={styles.favorites__container}>
        <CurrentPage showProductsCount={favoritesProduct.length} />

        {favoritesProduct.length > 0 ? (
          <div className={styles.favorites__cardWrapper}>
            {favoritesProduct.map(favoriteProduct => (
              <div className={styles.favorites__card} key={favoriteProduct.id}>
                {isLoading ? (
                  <SkeletonProduct />
                ) : (
                  <ProductCard product={favoriteProduct} isHotPrice={true} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.favorites__cardTitleWrapp}>
            <h1 className={styles.favorites__cartTitle}>
              Your favorites list is looking a little lonely...
              <br />
              Start adding items you love and we will keep them safe right here!
            </h1>
          </div>
        )}
      </div>
    </main>
  );
};
