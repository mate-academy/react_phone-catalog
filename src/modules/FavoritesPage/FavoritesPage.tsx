import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Catalog } from '../shared/components/Catalog';
import { Loader } from '../shared/components/Loader/Loader';
import { ProductCard } from '../shared/components/ProductCard/ProductCard';
import styles from './FavoritesPage.module.scss';
import { useAppContext } from '../../context/AppContext';
import { getProducts } from '../../utils/api';

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const { favoritesIds } = useAppContext();

  useEffect(() => {
    setIsLoad(true);

    getProducts()
      .then(products =>
        products.filter(product => favoritesIds.includes(product.id)),
      )
      .then(products => setFavorites(products))
      .finally(() => setIsLoad(false));
  }, [favoritesIds]);

  return (
    <>
      {isLoad ? (
        <Loader />
      ) : (
        <>
          {favoritesIds.length > 0 ? (
            <Catalog
              title="Favorites"
              products={favorites}
              renderItem={product => <ProductCard product={product} />}
            />
          ) : (
            <img
              className={styles.brokenHeart}
              src="icons/broken-heart.png"
              alt="broken-heart"
            />
          )}
        </>
      )}
    </>
  );
};
