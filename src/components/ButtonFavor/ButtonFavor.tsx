import React, { useMemo } from 'react';
import cn from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites } from '../../store/index';
import { setProduct, removeProduct } from '../../store/favorites';

type Props = {
  product: Product;
};

const ButtonFavor: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(getFavorites);

  const addToFavorites = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked) {
      dispatch(setProduct(product));
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  const isInFavorites = useMemo(() => (
    favorites.some(productFav => productFav.id === product.id)
  ), [favorites, product]);


  return (
    <label
      className={cn('ButtonFavor',
        {
          'ButtonFavor--isInFavorites': isInFavorites,
        })}
      htmlFor={`ButtonFavor__${product.id}`}
    >
      <input
        type="checkbox"
        id={`ButtonFavor__${product.id}`}
        checked={isInFavorites}
        className="ButtonFavor__Input"
        onChange={(e) => addToFavorites(e)}
      />
    </label>
  );
};

export default ButtonFavor;
