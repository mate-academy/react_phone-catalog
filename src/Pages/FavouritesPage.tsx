import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../components/ProductsList/ProductsList';
import { Fail } from '../elements/Empty/Fail';
import './Page.scss';
import { useAppSelector } from '../store/hooks';

export const FavouritesPage: React.FC = () => {
  const favouriteProducts = useAppSelector(state => state.favouriteProducts);

  return (
    <div className="page">
      <Breadcrumbs page="Favourites" />

      {favouriteProducts.length === 0 ? (
        <Fail title="Your favourites are empty" />
      ) : (
        <div className="page__main">
          <h1 className="page__title-h1 page__title-h1--product">Favourites</h1>
          <p className="page__prodCount">
            {favouriteProducts.length > 1
              ? `${favouriteProducts.length} models`
              : `${favouriteProducts.length} model`}
          </p>

          <ProductsList products={favouriteProducts} />
        </div>
      )}
    </div>
  );
};
