import React, { useContext } from 'react';

import './FavoritesPage.scss';
import { ProductsContext } from '../../components/ProductsContext';
import { ProductsList } from '../../components/ProductsList';
import { ProductsHeader } from '../../components/ProductsHeader';
import { NoResult } from '../../components/NoResult';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useContext(ProductsContext);

  return (
    <div className="main__favorites favorites">
      <div className="container">
        <div className="favorites__content">
          <ProductsHeader
            title="Favorites"
            length={favorites.length}
          />
          {
            favorites.length ? (
              <ProductsList
                products={favorites}
                data-cy="productList"
              />
            ) : (
              <NoResult message="Your favorites is empty" />
            )
          }
        </div>
      </div>
    </div>
  );
};
