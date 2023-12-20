import React, { useContext } from 'react';
import { ProductsContext } from '../store/ProductsContext';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Fail } from '../elements/Empty/Fail';
import './Page.scss';

export const FavouritesPage: React.FC = () => {
  const { favoriteProducts } = useContext(ProductsContext);

  return (
    <div className="page">
      <Breadcrumbs page="Favourites" />

      {favoriteProducts.length === 0 ? (
        <Fail title="Your favourites are empty" />
      ) : (
        <div className="page__main">
          <h1 className="page__title-h1 page__title-h1--product">Favourites</h1>
          <p className="page__prodCount">
            {favoriteProducts.length > 1
              ? `${favoriteProducts.length} models`
              : `${favoriteProducts.length} model`}
          </p>

          <ProductsList products={favoriteProducts} />
        </div>
      )}
    </div>
  );
};
