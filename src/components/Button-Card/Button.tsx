import { useState } from 'react';
import style from './button.module.scss';
import favourit from '@Images/icons/like-icons.svg';
import favouritActive from '@Images/icons/Favourites-active.svg';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';

type Props = {
  notifyAddedCart: () => void;
  toggleFavorite: () => void;
  notifyAddedFavorit: () => void;
  toggleItems: () => void;

  isAdded?: boolean;
  isFavorit?: boolean;
};

export const Button: React.FC<Props> = ({
  notifyAddedCart,
  isAdded,
  toggleFavorite,
  isFavorit,
  notifyAddedFavorit,
  toggleItems,
}) => {
  const [isAddItem, setIsAddItem] = useState(false);
  const { t } = useTranslation();

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
            toggleItems();
          }}
          className={cn(style.button, {
            [style.button__added]: isAdded,
            [style.button__empty]: !isAdded,
          })}
        >
          <span className={style.button__text}>
            {isAddItem ? t('cart.added') : t('cart.add')}
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
