import React, { FC } from 'react';
import { CartProduct } from '../../types/CartProduct';
import close from '../../images/icons/close.svg';
import minus from '../../images/icons/minus.svg';
import plus from '../../images/icons/plus.svg';
import fake from '../../images/img/fake.webp';

type Props = {
  product: CartProduct;
};

export const CartItem: FC<Props> = ({ product }) => {
  const { name, price, image, quantity } = product;

  const isDisabledMinus = quantity <= 1;

  return (
    <div className="cart-item item-cart">
      <button className="item-cart__remove" type="button">
        <img
          className="item-cart__remove-image"
          src={close}
          alt="button-close"
        />
      </button>
      <img src={fake} alt="" className="item-cart__image" />
      <div className="item-cart__name">{name}</div>
      <div className="item-cart__counter">
        <button
          className="item-cart__counter-btn"
          type="button"
          disabled={isDisabledMinus}
        >
          <img src={minus} alt="minus" />
        </button>
        <span className="item-cart__counter-number">{quantity}</span>
        <button className="item-cart__counter-btn" type="button">
          <img src={plus} alt="plus" />
        </button>
      </div>
      <div className="item-cart__price">${price}</div>
    </div>
  );
};
