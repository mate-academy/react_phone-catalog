import { Breadcrumbs } from '../Breadcrumbs';
import styles from './FavouritesPage.module.scss';
import { useFavorites } from '../../context/Favoutires';
import { ProductCard } from '../ProductCard';
import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { CategoryType } from '../../types/Category';
import { ShowOldPriceContext } from '../../context/OldPrice';
import { getProducts } from '../../api';
import { SkeletonLoader } from '../SkeletonLoader';

export const FavouritesPage = () => {
  const { favorites, count } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const price = useContext(ShowOldPriceContext);

  useEffect(() => {
    async function loadFavorites() {
      setIsLoading(true);
      const products = await getProducts();

      setFavoriteProducts(products.filter(p => favorites.includes(p.itemId)));
      setIsLoading(false);
    }

    loadFavorites();
  }, [favorites]);

  return (
    <section className={styles.favourites}>
      <div className={`${styles.container} container`}>
        <Breadcrumbs category="favorites" product={null} />
        <h1 className={styles.favourites__title}>Favourites</h1>
        <p className={styles.favourites__items}>{count} items</p>
        {isLoading && <SkeletonLoader count={count} />}
        {!isLoading && count === 0 && (
          <p className="favorites__empty-text">No favourite items selected</p>
        )}
        {!isLoading && count !== 0 && (
          <div className={styles.favourites__content}>
            {favoriteProducts.map(product => (
              <ProductCard
                product={product}
                showOldPrice={price}
                category={product.category as CategoryType}
                key={product.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
