import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as favouriteActions } from '../../../store/favourites';
import { getFavouritesGoods, getGoods } from '../../../store/store';
import { ProductDetails } from '../../../helpers/types';

export const ProductDetailsFavourite: React.FC<ProductDetails> = ({ product }) => {
  const dispatch = useDispatch();
  const favouriteGoods = useSelector(getFavouritesGoods);
  const goods = useSelector(getGoods);
  const addedToFavourite: boolean = favouriteGoods.some(good => good.id === product.id);

  const addGoodToFavourite = () => {
    const goodToAdd = goods.find(good => good.id === product.id);

    if (goodToAdd) {
      dispatch(favouriteActions.add(goodToAdd));
    }
  };

  const removeGoodFromFavourite = () => {
    const goodToRemove = goods.find(good => good.id === product.id);

    if (goodToRemove) {
      dispatch(favouriteActions.remove(goodToRemove));
    }
  };

  return (
    <button
      type="button"
      className="Actions-FavouriteButton"
      onClick={addedToFavourite
        ? removeGoodFromFavourite
        : addGoodToFavourite}
    >
      <img
        src={addedToFavourite
          ? 'img/icons/favourite-active.png'
          : 'img/icons/favourite.svg'}
        alt="header-favourite"
      />
    </button>
  );
};
