import React from 'react';
import classNames from 'classnames';

import styles from './AddToCard.module.scss';

import { IconType } from '@sTypes/IconType';

import { Icon } from '@components/Icon';

import { useAppDispatch, useAppSelector } from '@store/hooks';

import { toggle as toggleFavorites } from '@features/favoritesSlice';
import { toggle as toggleShoppingCart } from '@features/shoppingCartSlice';

type Props = {
  itemId: string;
};

export const AddToCard: React.FC<Props> = ({ itemId }) => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(state => state.favorites);
  const shoppingCart = useAppSelector(state => state.shoppingCart.itemIds);

  const isInShoppingCard = shoppingCart[itemId] !== undefined;

  return (
    <article className={styles['add-to-card']}>
      <div
        className={classNames(styles['add-to-card__button'], {
          [styles['add-to-card__button--selected']]: isInShoppingCard,
        })}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();

          dispatch(toggleShoppingCart(itemId));
        }}
      >
        {isInShoppingCard ? 'Selected' : 'Add to card'}
      </div>

      <div
        className={styles['add-to-card__icon']}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();

          dispatch(toggleFavorites(itemId));
        }}
      >
        <Icon
          type={
            favorites.includes(itemId)
              ? IconType.favoriteFilled
              : IconType.favorite
          }
          withBorder
        />
      </div>
    </article>
  );
};
