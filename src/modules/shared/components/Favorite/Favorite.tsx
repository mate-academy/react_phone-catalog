import { favoritesSlice } from '../../../../features/favorite/favoritesSlice';
import styles from './Favorite.module.scss';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';

type Props = {
  productId?: string;
};

export const Favorite: FC<Props> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const favoritesIds = useAppSelector(state => state.favorites);
  const isFavorite = favoritesIds.some((id: string) => id === productId);

  return (
    <button
      onClick={() => {
        if (isFavorite) {
          dispatch(favoritesSlice.actions.removeProduct(productId));
        } else {
          dispatch(favoritesSlice.actions.addProduct(productId));
        }
      }}
      className={`${styles.card__favorites} ${isFavorite ? styles.isFavorite : ''}`}
    >
      <span className={styles.favorites__img}></span>
    </button>
  );
};
