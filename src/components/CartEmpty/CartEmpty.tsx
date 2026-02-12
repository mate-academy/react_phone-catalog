import React from 'react';
import style from './CartEmpty.module.scss';

export const CartEmpty: React.FC = () => {
  return (
    <>
      <p className={style.cart__empty_text}>Your cart is empty</p>

      <img
        src="./img/cart-is-empty.png"
        alt="Emty cart"
        className={style.cart__empty_image}
      />
    </>
  );
};
