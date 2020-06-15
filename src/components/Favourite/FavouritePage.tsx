import React, { useContext } from 'react';
import { FavProductsContext } from './FavProductsContext';
import { ProductCard } from '../ProductPage/ProductCard/ProductCard';
import { BreadCrumbs } from '../BreadCrumbs';

export const FavouritePage = () => {
  const { favourites } = useContext(FavProductsContext);

  return (
    <>
      <div className="favourites container">
        <div>
          <BreadCrumbs />
          <h1 className="products__title">Favourites</h1>
          <p className="products__quantity">
            {favourites.length}
            {' '}
            <span className="products__quantityText">items</span>
          </p>
        </div>
        <div className="favorite">
          <ul className="favorite__list products__list">
            {favourites.map((item) => (
              <li key={item.id}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>

    </>
  );
};
