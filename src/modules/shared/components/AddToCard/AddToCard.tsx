import React from 'react';

import { IconType } from '@sTypes/IconType';

import { Icon } from '@components/Icon';
import { Button } from '@components/Button';

import { useAppDispatch, useAppSelector } from '@store/hooks';

import { toggle as toggleFavorites } from '@features/favoritesSlice';
import { toggle as toggleShoppingCart } from '@features/cartSlice';

import styles from './AddToCard.module.scss';

type Props = {
  itemId: string;
  onRemoveFromFavorite?: () => void;
};

export const AddToCard: React.FC<Props> = ({
  itemId,
  onRemoveFromFavorite = () => {},
}) => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(state => state.favorites);
  const shoppingCart = useAppSelector(state => state.cart.itemIds);

  const isInFavorite = favorites.includes(itemId);
  const isInShoppingCard = shoppingCart[itemId] !== undefined;

  return (
    <div className={styles['add-to-card']}>
      <Button
        active={isInShoppingCard}
        className={styles['add-to-card__button']}
        onClick={e => {
          e.stopPropagation();
          dispatch(toggleShoppingCart(itemId));
        }}
      >
        {isInShoppingCard ? 'Selected' : 'Add to card'}
      </Button>

      <button
        aria-label={isInFavorite ? 'Remove from favorite' : 'Add to favorite'}
        className={styles['add-to-card__icon']}
        onClick={e => {
          e.stopPropagation();

          if (isInFavorite) {
            onRemoveFromFavorite();
          }

          dispatch(toggleFavorites(itemId));
        }}
      >
        <Icon
          type={isInFavorite ? IconType.favoriteFilled : IconType.favorite}
          withBorder
        />
      </button>
    </div>
  );
};
