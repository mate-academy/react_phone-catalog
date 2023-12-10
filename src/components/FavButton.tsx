import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import favorite from '../images/icons/Favourites.svg';
import favoriteFilled
  from '../images/icons/Favourites(Heart Like).svg';

import { addFavorites, deleteFavorite } from '../Reducers/favReducer';
import { Products } from '../type/Products';
import { RootState } from '../Reducers/store';

type Props = {
  phone: Products;
};

export const FavButton: React.FC<Props> = ({ phone }) => {
  const [isFav, setIsFav] = useState<boolean>();

  const favs = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    setIsFav(
      favs.some((fav: Products) => fav.itemId === phone.itemId),
    );
  }, [favs]);

  const dispatch = useDispatch();

  const handler = (product: Products) => {
    if (isFav) {
      dispatch(deleteFavorite(product.itemId));
    } else {
      dispatch(addFavorites(product));
    }
  };

  return (
    <button
      type="button"
      className="button button__fav"
      onClick={() => handler(phone)}
      data-cy="addToFavorite"
    >
      <img src={isFav ? favoriteFilled : favorite} alt="" />
    </button>
  );
};
