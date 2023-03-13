import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { CartItemType } from '../../types/CartItemType';
import { calculatePrice, transformType } from '../../helpers/different';

import './CartItem.scss';

type Props = {
  cartItem: CartItemType,
  handleDeleteItem: (id: string) => MouseEventHandler<HTMLButtonElement>,
  handleClickPlus: (id: string) => MouseEventHandler<HTMLButtonElement>,
  handleClickMinus: (id: string) => MouseEventHandler<HTMLButtonElement>,
};

export const CartItem: React.FC<Props> = ({
  cartItem, handleDeleteItem, handleClickPlus, handleClickMinus,
}) => {
  return (
    <div className="cart-item">
      <div className="cart-item__top">
        <button
          type="button"
          className="cart-item__delete-button"
          data-cy="cartDeleteButton"
          onClick={handleDeleteItem(cartItem.id)}
        >
          <img
            src="icons/cross.svg"
            alt="delete button"
          />
        </button>

        <Link
          to={`../${transformType(cartItem.product.type)}/${cartItem.product.id}`}
          className="cart-item__link"
        >
          <img
            src={cartItem.product.imageUrl}
            alt="product img"
            className="cart-item__img"
          />

          <p
            className="cart-item__title"
          >
            {cartItem.product.name}
          </p>
        </Link>
      </div>

      <div className="cart-item__bottom">
        <div className="cart-item__control">
          <button
            type="button"
            disabled={cartItem.quantity === 1}
            className="cart-item__control-button"
            onClick={handleClickMinus(cartItem.id)}
          >
            <img
              src="icons/minus.svg"
              alt="minus button"
            />
          </button>

          <p
            className="cart-item__quantity"
            data-cy="productQauntity"
          >
            {cartItem.quantity}
          </p>

          <button
            type="button"
            className="cart-item__control-button"
            onClick={handleClickPlus(cartItem.id)}
          >
            <img
              src="icons/plus.svg"
              alt="plus button"
            />
          </button>
        </div>

        <h3 className="cart-item__price">
          {`$${
            calculatePrice(
              cartItem.product.price, cartItem.product.discount,
            ) * cartItem.quantity
          }`}
        </h3>
      </div>
    </div>
  );
};
