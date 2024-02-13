import './AddToFavButton.scss';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { GlobalContext } from '../../store';

type Props = {
  product: Product,
};

export const AddToFavButton: React.FC<Props> = ({ product }) => {
  const { favourites, dispatch } = useContext(GlobalContext);
  const isProductFav = favourites.some(fav => fav.id === product.id);

  return (
    <button
      data-cy="addToFavorite"
      type="button"
      className="add-to-fav-button"
      aria-label="button"
      onClick={() => dispatch({ type: 'SET_FAVOURITE', payload: product })}
    >
      <div className={classNames('icon', {
        'icon-fav-card': !isProductFav,
        'icon-fav-fill': isProductFav,
      })}
      />
    </button>
  );
};
