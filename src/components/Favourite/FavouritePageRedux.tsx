import React from 'react';
import { useSelector } from 'react-redux';
// import { FavProductsContext } from './FavProductsContext';
import { getFavorites } from '../../store/index';
import { ProductCard } from '../ProductPage/ProductCard/ProductCard';
import { BreadCrumbs } from '../BreadCrumbs';

export const FavouritePageRedux = () => {
  // const { favourites } = useContext(FavProductsContext);
  const favorites = useSelector(getFavorites);

  return (
    <>
      <div className="favourites container">
        <div>
          <BreadCrumbs />
          <h1 className="products__title">Favorites</h1>
          <p className="products__quantity">
            {favorites.length}
            {' '}
            <span className="products__quantityText">items</span>
          </p>
        </div>
        <div className="favorite">
          <ul className="favorite__list products__list">
            {favorites.map((item) => (
              <li key={item.id}>
                <ProductCard product={item} type={item.type} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
