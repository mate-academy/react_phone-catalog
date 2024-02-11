import React, { useContext } from 'react';
import { Cart } from '../../Type/Cart';
import { ProductContext } from '../../ProductContext';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

interface Props {
  cart: Cart,
}

export const CartItem: React.FC<Props> = ({ cart }) => {
  const { id, quantity, product } = cart;

  const {
    plusQuantity,
    minusQuantity,
    deleteCart,
  } = useContext(ProductContext);

  return (
    <div className="cart__item">
      <button
        type="button"
        data-cy="cartDeleteButton"
        className="cart__item__remove"
        onClick={() => deleteCart(id)}
      >
        <img src="./icon/Close.svg" alt="Close" />
      </button>

      <img
        src={`${BASE_URL}${product.image}`}
        alt="phone"
        className="cart__item__img"
      />

      <p className="cart__item__title">
        {product.name}
      </p>

      <div className="cart__item__quantity">
        <button
          type="button"
          className="cart__item__quantity__btn"
          onClick={() => minusQuantity(id, quantity)}
          disabled={quantity === 1}
        >
          <img src="./icon/Minus.svg" alt="Close" />
        </button>

        <p className="cart__item__quantity__num">
          {quantity}
        </p>

        <button
          type="button"
          className="cart__item__quantity__btn"
          onClick={() => plusQuantity(id, quantity)}
        >
          <img src="./icon/Plus.svg" alt="Close" />
        </button>
      </div>

      <h2 className="cart__item__price">
        {`$${quantity * product.fullPrice}`}
      </h2>
    </div>
  );
};
