/* eslint-disable no-console */
import React from 'react';
import { Product } from '../../types/Products';
import { useSearchContext } from '../Context/Context';
import favoriteIcon from './Favourites (Heart Like).svg';
import redHeart from './Favourites Filled (Heart Like).svg';
import './ButtonAddFavorite.scss';

interface Props {
  product: Product;
}

export const ButtonAddFavorite: React.FC<Props> = React.memo(({ product }) => {
  const { handleAddToFavorite, getFavorite } = useSearchContext();

  const isProductAdd = getFavorite.find(item => item.id === product.id);

  return (
    <button
      className="card__button--favorite"
      type="button"
      onClick={(e) => {
        e.preventDefault();
        handleAddToFavorite(product);
      }}
    >
      <img
        src={isProductAdd ? redHeart : favoriteIcon}
        alt="heart"
        className="card__button--favorite-img"
      />
    </button>
  );
});
