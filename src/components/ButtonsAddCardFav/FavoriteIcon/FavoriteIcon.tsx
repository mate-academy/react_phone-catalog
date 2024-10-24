import style from './FavoriteIcon.module.scss';
import classNames from 'classnames';
import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../../GlobalProvider';

type Props = {
  curProductId: string;
};
export const FavoriteIcon: React.FC<Props> = ({ curProductId }) => {
  const { productsInFavorive } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const prodInFavorite = !!productsInFavorive.find(
    prod => prod.itemId === curProductId,
  );

  return (
    <div
      className={classNames(
        style.icon_container,
        style.icon_container_favorite,
      )}
      onClick={() =>
        dispatch({ type: 'setFavoriteProducts', payload: curProductId })
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
