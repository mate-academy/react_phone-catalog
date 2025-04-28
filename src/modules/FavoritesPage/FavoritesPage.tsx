import { useContext } from 'react';

import styles from './FavoritesPage.module.scss';

import { CurrentPage } from '../../shared/components/CurrentPage';
import { ProductCard } from '../../shared/components/ProductCard';
import { FavoritesStateContext } from '../../shared/store/FavoritesProvider';

export const FavoritesPage = () => {
  const favoritesProduct = useContext(FavoritesStateContext);

  return (
    <main className={styles.favorites}>
      <div className={styles.favorites__container}>
        <CurrentPage showProductsCount={favoritesProduct.length} />

        {favoritesProduct.length > 0 ? (
          <div className={styles.favorites__cardWrapper}>
            {favoritesProduct.map(favoriteProduct => (
              <div className={styles.favorites__card} key={favoriteProduct.id}>
                <ProductCard product={favoriteProduct} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.favorites__cardTitleWrapp}>
            <h1 className={styles.favorites__cartTitle}>
              Your favorites list is looking a little lonely... 😢
              <br />
              Start adding items you love and we will keep them safe right here!
            </h1>
          </div>
        )}
      </div>
    </main>
  );
};
