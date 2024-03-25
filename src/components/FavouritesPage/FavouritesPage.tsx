import React, { useContext } from 'react';
import { PathRoute } from '../PathRoute';
import './FavouritesPage.scss';
import { StateContext } from '../../store/ProductsContext';
import { ProductCard } from '../ProductCard';

export const FavouritesPage: React.FC = () => {
  const { favourites } = useContext(StateContext);

  return (
    <div className="Favourites">
      <PathRoute />

      <h1 className="Favourites__title">Favourites</h1>
      <div className="Favourites__amount">{`${favourites.length} items`}</div>
      {!!favourites.length ? (
        <div className="Favourites__content">
          {favourites.map(product => (
            <div className="Favourites__content-item" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <h1>There are no favorite products yet</h1>
      )}
    </div>
  );
};
