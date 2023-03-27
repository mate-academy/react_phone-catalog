import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as HeartIcon } from '../../icons/favourites-icon.svg';
import { ProductItem } from '../../types/ProductItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  addNewFavourite,
  removeFavourite,
} from '../../redux/reducers/favouritesSlice';

import './addFavouriteBtn.scss';

type Props = {
  id: string;
};

export const AddFavouriteBtn: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();

  const [isActive, setIsActive] = useState(false);
  const { favourites } = useAppSelector(state => state.favourites);
  const { products } = useAppSelector(state => state.products);

  useEffect(() => {
    if (favourites.find((item: ProductItem) => item.id === id)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('favourite', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourite = () => {
    if (isActive) {
      dispatch(removeFavourite(id));
      setIsActive(!isActive);
    } else {
      const card = products?.filter((item: ProductItem) => item.id === id)[0];

      dispatch(addNewFavourite(card));
      setIsActive(!isActive);
    }
  };

  return (
    <button
      type="button"
      className={classNames(
        'add-favourite-btn',
        { 'add-favourite-btn_active': isActive },
      )}
      onClick={() => addToFavourite()}
    >
      <HeartIcon />
    </button>
  );
};
