import React from 'react';
import styles from './FavoritesButton.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/favoritesSlice';
import { RootState } from '../../store';

type Props = {
  productId: string;
};

export const FavoritesButton: React.FC<Props> = ({ productId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);
  const isFavorite = favorites.includes(productId);

  // if (!productId || typeof productId !== 'string') {
  //   console.warn('⚠️ productId is missing in FavoritesButton!');

  //   return null;
  // }

  console.log('❤️ Render FavoritesButton for:', productId);
  console.log('❤️ Is favorite?', isFavorite);

  console.log('📌 Переданий productId:', productId);

  if (!productId || typeof productId !== 'string') {
    console.warn('⚠️ Невалідний productId:', productId);
    return;
  }

  return (
    <button
      className={styles.favBtn}
      onClick={() => dispatch(toggleFavorite(productId))}
    >
      <img
        src={
          isFavorite
            ? '/react_phone-catalog/img/icons/favorites-icon-filled.svg'
            : '/react_phone-catalog/img/icons/favorites-icon.svg'
        }
        alt="Toggle favorite"
      />
    </button>
  );
};
