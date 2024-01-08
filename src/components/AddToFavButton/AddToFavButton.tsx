/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';

import { Product } from '../../types/Product';
import './AddToFavButton.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as favouriteActions from '../../features/favouritesSlicer';

type Props = {
  product: Product;
};

export const AddToFavButton: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const favouriteProducts = useAppSelector((state) => state.favourites.items);
  const isProductFav = favouriteProducts.some((fav) => fav.id === product.id);

  const isFavourite = favouriteProducts.some(
    (favProduct) => favProduct.phoneId === product.phoneId,
  );

  const handleAddFavourite = (newProduct: Product) => {
    if (isFavourite) {
      dispatch(favouriteActions.deleteFavouritesProducts(newProduct.id));
    } else {
      dispatch(favouriteActions.setFavouritesProducts(newProduct));
    }
  };

  return (
    <button
      data-cy="addToFavorite"
      type="button"
      className={cn('AddToFavButton', {
        'added-to-fav': isProductFav,
      })}
      onClick={(event) => {
        event.preventDefault();
        handleAddFavourite(product);
      }}
    >
      <div
        className={cn('icon', {
          'icon--favourites': !isProductFav,
          'icon--favourites-added': isProductFav,
        })}
      />
    </button>
  );
};
