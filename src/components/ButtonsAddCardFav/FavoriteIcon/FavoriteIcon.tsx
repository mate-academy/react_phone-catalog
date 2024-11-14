import style from './FavoriteIcon.module.scss';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../GlobalProvider';
import { Product } from '../../../types/Product';

type Props = {
  curProductId: string;
};
export const FavoriteIcon: React.FC<Props> = ({ curProductId }) => {
  const { inFavorites } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const prodInFavorite = inFavorites
    ? !!inFavorites.find((prod: Product) => prod.itemId === curProductId)
    : false;

  return (
    <div
      className={classNames(style.icon_container)}
      onClick={() =>
        dispatch({ type: 'toggleInFavorites', payload: curProductId })
      }
    >
      <div
        className={classNames(style.icon, style.icon_favorite, {
          [style.selected]: prodInFavorite,
        })}
      />
    </div>
  );
};
