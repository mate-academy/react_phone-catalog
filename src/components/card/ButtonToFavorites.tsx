import React, { useMemo } from 'react';
import './Buttons.scss';
import cn from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites } from '../../store/index';
import { setProduct, removeProduct } from '../../store/favorites';

type Props = {
  good: Good;
};

const ButtonFavor: React.FC<Props> = ({ good }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(getFavorites);

  const addToFavorites = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked) {
      dispatch(setProduct(good));
    } else {
      dispatch(removeProduct(good.id));
    }
  };

  const isInFavorites = useMemo(() => (
    favorites.some(productFav => productFav.id === good.id)
  ), [favorites, good]);


  return (
    <label
      className={cn('ButtonFavor',
        {
          'ButtonFavor--isInFavorites': isInFavorites,
        })}
      htmlFor={`ButtonFavor__${good.id}`}
    >
      <input
        type="checkbox"
        id={`ButtonFavor__${good.id}`}
        checked={isInFavorites}
        className="ButtonFavor__Input"
        onChange={(e) => addToFavorites(e)}
      />
    </label>
  );
};

export default ButtonFavor;
