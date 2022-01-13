import React, { useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';

type Props = {
  product: Product,
};

export const AddFavoriteButton:React.FC<Props> = ({ product }) => {
  const [handleChange, setHandleChange] = useState(false);

  const addToFavorite = () => {
    let favorites = [];

    if (localStorage.getItem('favorites')) {
      favorites = JSON.parse(localStorage.getItem('favorites') || '');
    }

    if (!favorites.includes(product.id)) {
      localStorage.setItem('favorites', JSON.stringify([
        ...favorites,
        product.id,
      ]));
    } else {
      localStorage.setItem('favorites', JSON.stringify([
        ...favorites.filter((p: string) => p !== product.id),
      ]));
    }

    setHandleChange(!handleChange);
  };

  return (
    <button
      className={classNames('products-slider__item-button products-slider__item-button-favorite', {
        'products-slider__item-button-favorite--active': localStorage.getItem('favorites')?.includes(product.id),
      })}
      type="button"
      onClick={addToFavorite}
    >
      <img src="./img/icons/like.svg" alt="add" />
      <img src="./img/icons/like-active.svg" alt="remove" />
    </button>
  );
};
