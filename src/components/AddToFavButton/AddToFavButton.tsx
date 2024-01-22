/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import cn from 'classnames';

import { Product } from '../../types/Product';
import './AddToFavButton.scss';
import { FavouritesContext } from '../../context/FavContext';

type Props = {
  product: Product,
};

export const AddToFavButton: React.FC<Props> = ({ product }) => {
  const { favourites, handleAddToFav } = useContext(FavouritesContext);
  const isProductFav = favourites.some(fav => fav.id === product.id);

  return (
    <button
      data-cy="addToFavorite"
      type="button"
      className="AddToFavButton"
      onClick={event => {
        event.preventDefault();
        handleAddToFav(product);
      }}
    >
      <div className={cn('icon', {
        'icon--favourites': !isProductFav,
        'icon--favourites-added': isProductFav,
      })}
      />
    </button>
  );
};
