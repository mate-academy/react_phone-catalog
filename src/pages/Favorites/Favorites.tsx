import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { FavoritesList } from '../../components/FavoritesList/FavoritesList';
import { usePhones } from '../../hooks/usePhones';

import './Favorites.scss';
import { client } from '../../client/httpClient';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader/Loader';

export const Favorites: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { favoritesIds, setProducts, products } = usePhones();

  useEffect(() => {
    setIsLoading(true);

    client.get<Product[]>('products.json')
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [setProducts]);

  const favoritesProducts = products.filter(({ itemId }) => {
    return favoritesIds.includes(itemId);
  });

  return (
    <section className="favorites">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="favorites__breadcrumbs">
            <Breadcrumbs />
          </div>

          {!favoritesIds.length && (
            <h1 className="content__title">
              No products in favorites
            </h1>
          )}

          {!!favoritesIds.length && (
            <>
              <h1 className="content__title">
                Favorites
              </h1>

              <p className="favorites__items-count">
                {`${favoritesIds.length} items`}
              </p>

              <FavoritesList
                favoriteProducts={favoritesProducts}
              />
            </>
          )}
        </>
      )}

    </section>
  );
};
