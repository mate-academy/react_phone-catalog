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
  const { addSelectedGood, isSelected } = useContext(CartContext);
  const { addFavouriteGood, isFavourite } = useContext(FavouritesContext);
  const [visibleTitle, setVisibleTitle] = useState<string>(title)

  var btnClass = cn('btn', classCSS, {
    'cart-active': isSelected(good),
    'fav-active': isFavourite(good),
  });


  const handleClick = (good: Good) => {
    if(classCSS === 'btn__add-to-cart') {
      addSelectedGood(good);
      setVisibleTitle('Added to cart')
    }
    if(classCSS === 'btn__add-to-fav') {
      addFavouriteGood(good);
    }
  }

  return (
    <button
      type="button"
      id={good.id}
      className={btnClass}
      onClick={() => handleClick(good)}
    >
     {visibleTitle}
    </button>
  )
}
