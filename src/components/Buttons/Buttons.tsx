import React from 'react';

export const Buttons = () => {
  return (
    <div className="product-card__buttons">
      <button type="button" className="button-cart">
        Add to cart
      </button>
      <button type="button" className="button-favorite">
        <img src="img/favorite.svg" alt="favorite" />
      </button>
    </div>
  );
};
