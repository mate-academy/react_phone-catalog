import React, { useContext, useState } from 'react';
import { CartContext } from './../../CartContext';
import { FavouritesContext } from './../../FavouritesContext';
import cn from 'classnames';

type ButtonProps = {
  classCSS: string;
  title: string;
  good: Good;
}

export const Button: React.FC<ButtonProps> = ({ classCSS, title, good }) => {
  const [isActiveButton, setActiveButton] = useState<boolean>(false);
  const { addSelectedGood, isSelected } = useContext(CartContext);
  const { addFavouriteGood, removeFavouriteGood, isFavourite } = useContext(FavouritesContext);

  var btnClass = cn('btn', classCSS, {
    'cart-active': isActiveButton,
    'fav-active': isActiveButton,
  });

  const handleClick = (good: Good) => {
    if(classCSS === 'btn__add-to-cart') {
      if (!isSelected(good)) {
        addSelectedGood(good);
        setActiveButton(true);
      }
    }
    if(classCSS === 'btn__add-to-fav') {
      if (!isFavourite(good)) {
        addFavouriteGood(good);
        setActiveButton(true);
      } else {
        console.log('hi')
        removeFavouriteGood(good);
        setActiveButton(false);
      }
    }
  }

  return (
    <button
      type="button"
      id={good.id}
      className={btnClass}
      onClick={() => handleClick(good)}
    >
     {isActiveButton&&(classCSS === 'btn__add-to-cart') ? `Added to cart` : title}
    </button>
  )
}
