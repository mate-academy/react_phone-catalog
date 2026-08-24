import styles from './favorites.module.scss';

import { useProductActions } from '../../context/ProductActionsContext';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductNavigation } from '../ProductNavigation';

import { allProducts } from '../../styles/utils/getAllProducts';
import { useProducts } from '../../hooks/usePoducts';
import { Loader } from '../Loader';

export const Favorites = () => {
  const { liked } = useProductActions();
  const { loading } = useProducts();

  const uniqueProducts = Array.from(
    new Map(allProducts.map(product => [product.id, product])).values(),
  );

  const favoriteProducts = uniqueProducts.filter(product =>
    liked.includes(String(product.id)),
  );

  return (
    <div className={styles.favourites}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.favourites__navigation}>
            <ProductNavigation />

            <div className={styles.favourites__header}>
              <h1 className={styles.favourites__title}>Favourites</h1>

              <div className={styles.favourites__length}>
                {favoriteProducts.length > 0 ? (
                  `${favoriteProducts.length} items`
                ) : (
                  <div className={styles.noFavorite__title}>
                    <p>No favorite products yet</p>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.catalog}>
              {favoriteProducts.map(product => (
                <div key={product.id} className={styles.catalog__item}>
                  <ProductCard item={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
