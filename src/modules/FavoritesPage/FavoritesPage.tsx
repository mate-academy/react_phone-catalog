import React, { useEffect, useState } from 'react';
import favoritesPageStyles from './FavoritesPage.module.scss';
import { ProductList } from '../../components/ProductList';
import { useFavorites } from '../../context/FavoriteContext';
import { Product } from '../../types/Product';
import { getProductsByIds } from '../../services/products';
import { LoaderOverlay } from '../../components/LoaderOverlay';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProductsByIds(favorites)
      .then(productsFromServer =>
        setProducts(
          favorites
            .map(id =>
              productsFromServer.find(product => product.itemId === id),
            )
            .filter((product): product is Product => product !== undefined),
        ),
      )
      .finally(() => setIsLoading(false));
  }, [favorites]);

  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <section className={favoritesPageStyles.favorites}>
      <div className={favoritesPageStyles.favorites__header}>
        <h1 className={favoritesPageStyles.favorites__title}>Favorites</h1>
        <p
          className={favoritesPageStyles.favorites__subtitle}
        >{`${favorites.length} models`}</p>
      </div>
      <ProductList products={products} />
    </section>
  );
};
