import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../helpers/constants';
import {
  CartItem as ProductInCart,
  useAppContext,
} from '../../store/AppContext';
import './CartItem.scss';

type Props = {
  product: ProductInCart,
};

export const CartItem: React.FC<Props> = ({
  product,
}) => {
  const {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useAppContext();

  const {
    image,
    name,
    quantity,
    price,
    id,
  } = product;

  const path = `/phones/${product.itemId || product.id}`;

  const increaseQuantityHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    increaseQuantity(id);
  };

  const removeFromCartHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    removeFromCart(id);
  };

  const decreaseQuantityHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    decreaseQuantity(id);
  };

  return (
    <li className="cart-item">
      <button
        type="button"
        className="cart-item__delete-button"
        data-cy="cartDeleteButton"
        onClick={removeFromCartHandler}
      >
        <span
          className="cart-item__delete-button-icon"
        />
      </button>

      <Link
        to={`${path}`}
        className="cart-item__img-container"
      >
        <img
          src={`${BASE_URL}${image}`}
          alt={name}
          className="cart-item__img"
        />
      </Link>

      <Link
        to={`${path}`}
        className="cart-item__name"
      >
        {name}
      </Link>

      <div className="cart-item__buttons">
        <button
          type="button"
          onClick={decreaseQuantityHandler}
          className={classNames('cart-item__minus-button', {
            ' cart-item__minus-button--disabled': quantity === 1,
          })}
        >
          <span
            className="cart-item__minus-button-icon"
          />
        </button>

        <span
          className="cart-item__quantity"
        >
          {quantity}
        </span>

        <button
          type="button"
          className="cart-item__plus-button"
          onClick={increaseQuantityHandler}
        >
          <span
            className="cart-item__plus-button-icon"
          />
        </button>
      </div>

      <span
        className="cart-item__price"
      >
        {`$${price}`}
      </span>
    </li>
  );
};
