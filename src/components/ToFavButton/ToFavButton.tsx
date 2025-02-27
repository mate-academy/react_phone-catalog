import React from 'react';
import classNames from 'classnames';
import { useDispatch, useGlobalState } from '../../hooks/hooks';
import { Product } from '../../types/Product';
import './ToFavButton.scss';

type Props = {
  product: Product;
};

export const ToFavButton: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const { favourites } = useGlobalState();

  const isInFav = favourites.some(item => item.itemId === product.itemId);

  const handleToggleFav = () => {
    return isInFav
      ? dispatch({ type: 'deleteFromFav', payload: product.itemId })
      : dispatch({ type: 'addToFav', payload: product });
  };

  return (
    <div
      className={classNames('fav', {
        'fav--filled': isInFav,
      })}
      onClick={handleToggleFav}
    ></div>
  );
};
