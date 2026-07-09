import React from 'react';
import { CardHP } from '../CardHP/CardHP';
import './FavouritesPage.scss';
import { Product } from '../../types';
import { useCart } from '../Cart/CartContext';
import { useFavourites } from './FavouritesContext';

type FavouritesPageProps = {
  favourites: Product[];
  addToFav?: (product: Product) => void;
};
export const FavouritesPage: React.FC<FavouritesPageProps> = ({}) => {
  const { favourites, addToFav } = useFavourites();

  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="favourites-page">
      <h1>Your Favourites</h1>

      {favourites.length === 0 ? (
        <div className="favourites-page__ntf">
          <img
            className="favourites-page__ntf__photo"
            src={`${baseUrl}/img/cart-is-empty.png`}
            alt="Favourites are empty"
          />
        </div>
      ) : (
        <div className="favourites-page__list">
          {favourites.map(product => (
            <CardHP
              key={product.id}
              product={product}

            />
          ))}
        </div>
      )}
    </div>
  );
};
