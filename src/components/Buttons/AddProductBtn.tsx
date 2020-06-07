import React from 'react';
import cn from 'classnames';

export const AddProductBtn = ({ productId, styleSize }: PrimaryBtnProps) => {
  return (
    <label
    className={cn(
      'button-to-cart', styleSize,
    )}
    htmlFor={`button-to-cart__${productId}`}
  >
    <input
      className="button-to-cart__input"
      type="checkbox"
      id={`button-to-cart__${productId}`}
    />
    <span className="button-to-cart__title">
      Add to cart
    </span>
  </label>
  );
};
