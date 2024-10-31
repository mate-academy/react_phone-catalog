import React from 'react';
import './ShoppingBag.scss';

export const ShoppingBag = () => {
  return (
    <div className="shopping-bag">
      <a href="#basket" className="shopping-bag__link">
        <img
          src="../../../img/shopping-bag.svg"
          alt="Shopping bag"
          className="shopping-bag__image"
        />
      </a>
    </div>
  );
};
