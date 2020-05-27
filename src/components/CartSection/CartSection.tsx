import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from './../CartContext';
import { FavouritesContext } from './../FavouritesContext';


export const CartSection = () => {
const { selectedGoods } = useContext(CartContext);
const { favouriteGoods } = useContext(FavouritesContext);
console.log(favouriteGoods.length)

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
      {(selectedGoods.length > 0)
        && (
          <span className="customer-section__item-count">
            {selectedGoods.length}
          </span>
        )
      }
        <NavLink to="/cart" className="customer-section__link customer-section__link--cart" />
      </div>
    </>
  )
}

