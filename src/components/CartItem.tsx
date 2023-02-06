import React, { useContext } from 'react';
import '../styles/components/CartItem.scss';
import { ProductInCart } from '../types/ProductInCart';
import { Context } from './ContextProvider';

type Props = {
  product: ProductInCart,
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const {
    imageUrl,
    name,
    quantity,
    price,
    discount,
  } = product;

  const { cartChangeQuantity, cartDelete } = useContext(Context);

  const actualPrice = Math.round(price * ((100 - discount) / 100));

  return (
    <div className="cart-item">
      <div className="cart-item__left">
        <button
          type="button"
          className="cart-item__delete"
          onClick={() => cartDelete(product)}
          data-cy="cartDeleteButton"
        >
          <img src="../assets/cross.svg" alt="cross" />
        </button>
        <img
          src={`../${imageUrl}`}
          alt="product"
          className="cart-item__image"
        />
        <p className="text__body text__body--primary cart-item__name">
          {name}
        </p>
      </div>
      <div className="cart-item__right">
        <div className="cart-item__quantity">
          <button
            type="button"
            className="button cart-item__button"
            disabled={quantity === 1}
            onClick={() => cartChangeQuantity(product, -1)}
          >
            <img src="../assets/minus.svg" alt="minus" />
          </button>
          <span className="text__body text__body--primary">
            {quantity}
          </span>
          <button
            type="button"
            className="button cart-item__button"
            onClick={() => cartChangeQuantity(product, 1)}
          >
            <img src="../assets/plus.svg" alt="plus" />
          </button>
        </div>
        <p className="title__h2 title__h2--primary cart-item__price">
          {`$${actualPrice * quantity}`}
        </p>
      </div>
    </div>
  );
};
