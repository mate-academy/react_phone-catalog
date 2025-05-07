import React from 'react';
import { favActions } from '../../store/favourites/favouritesSlice';
import styles from './AddToFavsButton.module.scss';
import cn from 'classnames';
import { Icon } from '../Icon';
import HeartFilledIcon from '@assets/icons/heart-filled-icon.svg?react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

type Props = {
  itemId: string;
  isLiked: boolean;
  isBig?: boolean;
};

export const AddToFavsButton: React.FC<Props> = ({
  itemId,
  isLiked,
  isBig = false,
}) => {
  const { isDark } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  return (
    <button
      className={cn(
        styles['fav-btn'],
        isDark ? styles['fav-btn--dark'] : styles['fav-btn--light'],
        {
          [styles['fav-btn--big']]: isBig,
          [styles['fav-btn--selected']]: isLiked,
        },
      )}
      onClick={() => {
        dispatch(favActions.toggleFavorite(itemId));
      }}
    >
      {isLiked ? <HeartFilledIcon /> : <Icon type={'heart'} />}
    </button>
  );
};
