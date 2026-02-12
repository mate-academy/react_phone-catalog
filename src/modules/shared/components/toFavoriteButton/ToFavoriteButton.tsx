import React from 'react';

import styles from './ToFavoriteButton.module.scss';
import { AppButton } from '../appButton';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  deleteItem,
  setItem,
} from '../../../../features/favoritesSlice/favorites';
import { Products } from '../../../../types/Products';
import { FavouritesSvg } from '../../svg/FavouritesSvg';

type MoreProps = {
  product: Products;
};

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & MoreProps;

export const ToFavouriteButton: React.FC<Props> = ({ product, ...props }) => {
  const dispatch = useAppDispatch();

  const favourites = useAppSelector(s => s.favourites);

  const productInFavourites = favourites.some(f => f.itemId === product.itemId);

  if (!product) {
    return null;
  }

  const buttonName = productInFavourites
    ? 'Remove to fovourites'
    : 'Add to fovourites';

  const onClickButton = productInFavourites
    ? () => dispatch(deleteItem(product))
    : () => dispatch(setItem(product));

  return (
    <AppButton
      className={styles.favoriteButton}
      buttonName={buttonName}
      onClick={onClickButton}
      {...props}
    >
      <FavouritesSvg
        color={
          productInFavourites
            ? 'var(--favorite-icon-active-color)'
            : 'var(--favorite-icon-color)'
        }
        insideFill={productInFavourites}
      />
    </AppButton>
  );
};
