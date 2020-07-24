import React from 'react';

export const AddButton = () => {
  return (
    <>
      <button className="button card__button--add">Add to cart</button>
      <button className="button card__button--choose">
        <img src="../../img/images/favorite.svg" alt="favorite"/>
      </button>
    </>
  )
}
