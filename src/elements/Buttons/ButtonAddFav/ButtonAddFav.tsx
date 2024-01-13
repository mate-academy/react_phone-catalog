import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store/hooks';
import { ProductType } from '../../../helpers/types/ProductType';
import { setFavouriteModal } from '../../../features/modalSlice';
import {
  addToFavourite,
  removeFromFavourite,
} from '../../../features/favouriteSlice';
import './ButtonAddFav.scss';

type Props = {
  product: ProductType;
};

export const ButtonAddFav: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const favouriteProducts = useAppSelector(state => state.favouriteProducts);

  function isProductFavorite() {
    const copy = Array.from(favouriteProducts);

    return copy.map(fav => JSON.stringify(fav))
      .includes(JSON.stringify(product));
  }

  function handleClick(): void {
    if (isProductFavorite()) {
      dispatch(removeFromFavourite(product.id));
    } else {
      dispatch(addToFavourite(product));
      dispatch(setFavouriteModal());
    }
  }

  return (
    <button
      type="button"
      aria-label="button"
      onClick={handleClick}
      className="buttonAddFav"
    >
      <div className="buttonAddFav__icon-keeper">
        <div className={classNames(
          'buttonAddFav__icon', {
            'buttonAddFav__icon--active': isProductFavorite(),
          },
        )}
        />
      </div>
    </button>
  );
};
