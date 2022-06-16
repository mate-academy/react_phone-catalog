import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as HeartIcon } from '../../icons/favourites-icon.svg';
import { ProductItem } from '../../types/ProductItem';

import './addFavouriteBtn.scss';

type Props = {
  id: string;
  card: ProductItem;
};

export const AddFavouriteBtn: React.FC<Props> = ({ id, card }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const storageValue: string | null = localStorage.getItem('favourite');
    const parsedStorage: ProductItem[] | [] = storageValue
      ? JSON.parse(storageValue)
      : [];

    if (parsedStorage.find((item: ProductItem) => item.id === id)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, []);

  const addToFavourite = () => {
    if (isActive) {
      const storageValue: string | null = localStorage.getItem('favourite');

      let parsedStorage = storageValue ? JSON.parse(storageValue) : [];

      parsedStorage = parsedStorage.filter((item: any) => item.id !== id);
      window.localStorage.setItem('favourite', JSON.stringify(parsedStorage));

      setIsActive(!isActive);
    } else {
      const storageValue: string | null = localStorage.getItem('favourite');

      const parsedStorage = storageValue ? JSON.parse(storageValue) : [];

      parsedStorage.push(card);
      window.localStorage.setItem('favourite', JSON.stringify(parsedStorage));

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
