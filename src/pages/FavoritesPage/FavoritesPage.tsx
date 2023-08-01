import React, { useContext } from 'react';

import { FavContext } from '../../providers/FavProvider/FavProvider';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard/ProductCard';

import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const { favoriteProducts } = useContext(FavContext);

  return (
    <div className="FavoritesPage">
      <div className="container">
        <div className="FavoritesPage__content">
          <Breadcrumbs />

          {favoriteProducts.length === 0 && (
            <h1 className="FavoritesPage__title">
              You don&apos;t have favorite products
            </h1>
          )}

          {favoriteProducts.length > 0 && (
            <>
              <h1 className="FavoritesPage__title">Favorites</h1>
              <div className="FavoritesPage__quantity">{`${favoriteProducts.length} items`}</div>

              <div className="FavoritesPage__list">
                {favoriteProducts.map((favProduct) => (
                  <ProductCard product={favProduct} key={favProduct.id} />
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
