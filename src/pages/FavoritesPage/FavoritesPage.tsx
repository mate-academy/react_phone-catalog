import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FavContext } from '../../providers/FavProvider/FavProvider';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductCard } from '../../components/ProductCard/ProductCard';

import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const { favoriteProducts } = useContext(FavContext);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredFavorites = useMemo(() => {
    return favoriteProducts.filter(favProd => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedName = favProd.name.toLowerCase().trim();

      return normalizedName.includes(normalizedQuery);
    });
  }, [favoriteProducts, query]);

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
              <div className="FavoritesPage__quantity">{`${filteredFavorites.length} items`}</div>

              <div className="FavoritesPage__list">
                {filteredFavorites.map((favProduct) => (
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
