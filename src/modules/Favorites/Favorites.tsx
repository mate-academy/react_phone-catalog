import React, { useMemo } from 'react';
import styles from './Favorites.module.scss';
import { NavigationItem } from '../../shared/layout/NavigationItem';
import { ProductsList } from '../../shared/layout/ProductsList/ProductsList';
import { useProducts } from '../../shared/context/ProductsContext';
import { useProductsState } from '../../shared/context/ProductsStateContext';
import { Loader } from '../../shared/layout/Loader';

export const Favorites: React.FC = () => {
  const { products, loading } = useProducts();
  const { favorites } = useProductsState();

  const filteredProducts = useMemo(() => {
    return products.filter(item => favorites.includes(item.id));
  }, [products, favorites]);

  return (
    <div className={styles.favorites}>
      <div className={`${styles.favorites__container} container`}>
        {loading && <Loader />}

        {!loading && filteredProducts.length === 0 && (
          <span className="title">
            No favorites yet — add products you like!
          </span>
        )}

        {!loading && filteredProducts && filteredProducts.length > 0 && (
          <>
            <NavigationItem />
            <div className={styles.favorites__wrapper}>
              <div className={styles.favorites__title}>Favorites</div>
              <div className={styles.favorites__subtitle}>
                {filteredProducts.length} items
              </div>
            </div>

            <ProductsList filteredProducts={filteredProducts} />
          </>
        )}
      </div>
    </div>
  );
};
