import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getFavorites } from '../../store/index';
import { setProduct, removeProduct } from '../../store/favorites';

type Props = {
  product: ProductItem;
};

const AddToFavorButton: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(getFavorites);

  const addToFav = (
    event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(setProduct(product));
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  const isFavourite = useMemo(() => (
    favorites.some(favourite => favourite.id === product.id)
  ), [favorites, product]);

  return (
    <label
      className={isFavourite
        ? 'button__favorite button__favorite--checked'
        : 'button__favorite'}
      htmlFor={`button__favorite--${product.id}`}
    >
      <input
        className="button__favorite--input"
        type="checkbox"
        checked={isFavourite}
        id={`button__favorite--${product.id}`}
        onChange={(event) => addToFav(event)}
      />
    </label>
  );
};

export default AddToFavorButton;
