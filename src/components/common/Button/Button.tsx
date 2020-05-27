import React, { useContext } from 'react';
import { CartContext } from './../../CartContext';
import { FavouritesContext } from './../../FavouritesContext';

type ButtonProps = {
  classCSS: string;
  title: string;
  good: Good;
}

export const Button: React.FC<ButtonProps> = ({ classCSS, title, good }) => {
  const { addSelectedGood } = useContext(CartContext);
  const { addFavouriteGood } = useContext(FavouritesContext);

  const handleClick = (good: Good) => {
    if(classCSS === 'btn__add-to-cart') {
      addSelectedGood(good);
    }
    if(classCSS === 'btn__add-to-fav') {
      addFavouriteGood(good);
    }
  }

  return (
    <button
      type="button"
      id={good.id}
      className={classCSS}
      onClick={() => handleClick(good)}
    >
      {title}
    </button>
  )
}
