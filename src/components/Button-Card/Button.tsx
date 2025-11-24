import { useState } from 'react';
import style from './button.module.scss';
import favourit from '@Images/icons/like-icons.svg';
import favouritActive from '@Images/icons/Favourites-active.svg';

import cn from 'classnames';

type Props = {
  increaseToCart: () => void;
  notifyAddedCart: () => void;
  toggleFavorite: () => void;
  notifyAddedFavorit: () => void;
  isAdded?: boolean;
  isFavorit?: boolean;
};

export const Button: React.FC<Props> = ({
  increaseToCart,
  notifyAddedCart,
  isAdded,
  toggleFavorite,
  isFavorit,
  notifyAddedFavorit,
}) => {
  const [isAddItem, setIsAddItem] = useState(false);

  const toggle = () => {
    setIsAddItem(!isAddItem);
  };

  return (
    <>
      <div className={`${style.container} `}>
        <button
          onClick={() => {
            toggle();
            notifyAddedCart();
            increaseToCart();
          }}
          className={cn(style.button, {
            [style.button__added]: isAdded,
            [style.button__empty]: !isAdded,
          })}
          disabled={isAddItem}
        >
          <span className={style.button__text}>
            {isAddItem ? 'Added' : 'Add to cart'}
          </span>
        </button>
        <button
          onClick={() => {
            toggleFavorite();
            notifyAddedFavorit();
          }}
          className={style.favourit}
        >
          <img
            className={style.favourit__icon}
            src={isFavorit ? favouritActive : favourit}
            alt="favorit"
          />
        </button>
      </div>
    </>
  );
};
