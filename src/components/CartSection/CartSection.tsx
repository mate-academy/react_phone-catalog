import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCartGoods, getFavouritesGoods } from '../../store';

export const CartSection = () => {
  const cartGoods = useSelector(getCartGoods)
  const favouriteGoods = useSelector(getFavouritesGoods)

  return (
    <>
      <div className="customer-section__item">
      {(favouriteGoods.length > 0)
        && (
          <span className="customer-section__item-count">
            {favouriteGoods.length}
          </span>
        )
      }
        <NavLink to="/favourites" className="customer-section__link customer-section__link--fav" />
      </div>
      <div className="customer-section__item customer-section__item--cart">
      {(cartGoods.length > 0)
        && (
          <span className="customer-section__item-count">
            {cartGoods.length}
          </span>
        )
      }
        <NavLink to="/cart" className="customer-section__link customer-section__link--cart" />
      </div>
    </>
  )
}

