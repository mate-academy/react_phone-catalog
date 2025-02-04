import React from 'react';
import classNames from 'classnames';

import styles from './AddToCard.module.scss';

import { IconType } from '@sTypes/IconType';

import { Icon } from '@components/Icon';

import { useAppDispatch, useAppSelector } from '@store/hooks';

import { toggle as toggleFavorites } from '@features/favoritesSlice';
import { toggle as toggleShoppingCart } from '@features/shoppingCartSlice';

type Props = {
  id: number;
};

export const AddToCard: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector(state => state.favorites);
  const shoppingCart = useAppSelector(state => state.shoppingCart.ids);

  const isInShoppingCard = shoppingCart[id] !== undefined;

  return (
    <div className={styles['add-to-card']}>
      <div
        className={classNames(styles['add-to-card__button'], {
          [styles['add-to-card__button--selected']]: isInShoppingCard,
        })}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();

          dispatch(toggleShoppingCart(id));
        }}
      >
        {isInShoppingCard ? 'Selected' : 'Add to card'}
      </div>

      <div
        className={styles['add-to-card__icon']}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();

          dispatch(toggleFavorites(id));
        }}
      >
        <Icon
          type={
            favorites.includes(id) ? IconType.favoriteFilled : IconType.favorite
          }
          withBorder
        />
      </div>
    </div>
  );
};
