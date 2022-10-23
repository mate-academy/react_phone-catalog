/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useState } from 'react';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
  inDetails: boolean;
};

export const FavoriteButton: React.FC<Props> = ({
  product,
  inDetails,
}) => {
  const stateCondition = localStorage.getItem('favorites')?.includes(product.id)
    || false;
  const [isFavorites, setIsFavorites] = useState(stateCondition);

  const handleFavoriteClick = () => {
    let favorites = [];

    if (localStorage.getItem('favorites')) {
      favorites = JSON.parse(localStorage.getItem('favorites') || '');
    }

    if (favorites.find((prod: Product) => prod.id === product.id)) {
      localStorage.setItem('favorites', JSON.stringify([
        ...favorites.filter((prod: Product) => prod.id !== product.id),
      ]));
    } else {
      localStorage.setItem('favorites', JSON.stringify([
        ...favorites,
        product,
      ]));
    }

    window.dispatchEvent(new Event('storage'));
    setIsFavorites(!isFavorites);
  };

  return (
    <button
      data-cy="addToFavorite"
      type="button"
      className={classNames('buttons__buy-button favourites-button', {
        'favourites-button--is-favorite': isFavorites,
        'favourites-button--in-details': inDetails,
      })}
      onClick={handleFavoriteClick}
    />
  );
};
