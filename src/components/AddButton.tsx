import React from 'react';
import { useDispatch } from 'react-redux';
import { setBasket } from '../store/basket';
import { Phone } from '../interfaces';

interface Props {
  goodItem: Phone;
}

export const AddButton: React.FC<Props>  = ({ goodItem }) => {
  const dispatch = useDispatch();
  const handleClick = (goodItem: Phone) => {
    dispatch(setBasket(goodItem))
  }
  return (
    <>
      <button
        className="button card__button--add"
        onClick={() => handleClick(goodItem)}
      >
        Add to cart
      </button>
      <button className="button card__button--choose">
        <img src="../../img/images/favorite.svg" alt="favorite"/>
      </button>
    </>
  )
}
