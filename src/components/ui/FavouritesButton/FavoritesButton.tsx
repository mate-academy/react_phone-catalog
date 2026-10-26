/* eslint-disable max-len */
import React, { ButtonHTMLAttributes } from 'react';
import styles from './FavouritesButton.module.scss';
import cn from 'classnames';
import { Product } from 'src/types/Types';
import heartIcon from '/icons/favourites-heart-like.svg';
import filledHeartIcon from '/icons/favourites-filled-heart-like.svg';
import { useStoreContext } from 'src/context/StoreContext';

type Props = { product: Product } & ButtonHTMLAttributes<HTMLButtonElement>;

export const FavoritesButton: React.FC<Props> = ({
  className,
  product,
  ...rest
}) => {
  const { toggleFavourites, favourites } = useStoreContext();

  const isFavourite = favourites.some(item => item.id === product.id);

  return (
    <button
      {...rest}
      onClick={() => toggleFavourites(product)}
      className={cn(styles.button, className)}
    >
      <img
        src={isFavourite ? filledHeartIcon : heartIcon}
        alt="Favorite"
        className={styles.icon}
      />
    </button>
  );
};
