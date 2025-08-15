import React from 'react';

export const Buttons: React.FC = () => {
  return (
    <div className="product__button">
      <button className="product__button--add">Add to cart</button>
      <button className="product__button--favourite">
        <img
          src="/img/icons/icon-favourites.svg"
          alt="favourites icon"
          className="product__button-icon"
        />
      </button>
    </div>
  );
};
