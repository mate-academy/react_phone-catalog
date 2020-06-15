import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCartGoods, getFavouritesGoods } from '../../../store';
import { addCartGood } from '../../../store/cart';
import {addFavouriteGood, removeFavouriteGood } from '../../../store/favourites';
import cn from 'classnames';

type ButtonProps = {
  classCSS: string;
  title: string;
  good: Good;
}

export const Button: React.FC<ButtonProps> = ({ classCSS, title, good }) => {
  const dispatch = useDispatch();
  const cartGoods: cartGood[] = useSelector(getCartGoods);
  const favouritesGoods: Good[] = useSelector(getFavouritesGoods)
  const isCartButton = (classCSS ==='btn__add-to-cart' || classCSS ==='btn__add-to-cart--primary');
  const isFavButton = (classCSS === 'btn__add-to-fav' || classCSS ==='btn__add-to-fav--primary');

  const btnClass = cn('btn', classCSS, {
    'cart-active': cartGoods.some(cartGood => cartGood.id === good.id) && isCartButton,
    'fav-active': favouritesGoods.some(favGood => favGood.id === good.id) && isFavButton,
  });
  const isAddedToCart = btnClass === 'btn btn__add-to-cart cart-active' || btnClass === 'btn btn__add-to-cart--primary cart-active';

  const handleClick = (good: Good) => {
    if (isCartButton) {
      if (cartGoods.some(cartGood => cartGood.id === good.id)) {
        return;
      }

      dispatch(addCartGood(good));
    }

    if(isFavButton) {
      if (favouritesGoods.some(favGood => favGood.id === good.id)) {
        dispatch(removeFavouriteGood(good.id));
      } else {
        dispatch(addFavouriteGood(good));
      }
    }
  }

  return (
    <button
      type="button"
      id={good.id+classCSS}
      className={btnClass}
      onClick={() => handleClick(good)}
    >
    {isAddedToCart ? 'Added to cart': title}
    </button>
  )
}
