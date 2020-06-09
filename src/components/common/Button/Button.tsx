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

  const btnClass = cn('btn', classCSS, {
    'cart-active': cartGoods.some(cartGood => cartGood.id === good.id) && (classCSS ==='btn__add-to-cart'),
    'fav-active': favouritesGoods.some(favGood => favGood.id === good.id) && (classCSS === 'btn__add-to-fav'),
  });

  const handleClick = (good: Good) => {
    if(classCSS === 'btn__add-to-cart') {
      if (cartGoods.some(cartGood => cartGood.id === good.id)) {
        return;
      }

      dispatch(addCartGood(good));
    }

    if(classCSS === 'btn__add-to-fav') {
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
    {btnClass === 'btn btn__add-to-cart cart-active'? 'Added to cart': title}
    </button>
  )
}
