import React, { useContext } from 'react';
import cn from 'classnames';
import './CartItem.scss';

import { CartItemInfo } from '../../types/CartItemInfo';
import { ProductsContext } from '../../helpers/ProductsContext';
import crossIcon from '../../images/cross.svg';

type Props = {
  cartItem: CartItemInfo;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const {
    deleteProductFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(ProductsContext);
  const { quantity, product } = cartItem;

  const newPrice = product.discount > 0
    ? product.price
      - (product.price * product.discount) / 100
    : product.price;

  const handleDelete = () => deleteProductFromCart(product);
  const handleDecrease = () => decreaseQuantity(product);
  const handleIncrease = () => increaseQuantity(product);

  const isDisabled = quantity === 1;

  return (
    <div className="cart-item">
      <div className="cart-item__content">
        <div className="cart-item__part">
          <button
            type="button"
            className="cart-item__cross-button"
            onClick={handleDelete}
            data-cy="cartDeleteButton"
          >
            <img src={crossIcon} alt="cross icon" />
          </button>

          <div className="cart-item__image-wrapper">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="cart-item__image"
            />
          </div>

          <p className="cart-item__text cart-item__text--name">
            {product.name}
          </p>
        </div>

        <div className="cart-item__part">
          <div className="cart-item__buttons-wrapper">
            <button
              type="button"
              className="cart-item__button"
              onClick={handleDecrease}
              disabled={isDisabled}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  'cart-item__icon',
                  {
                    'cart-item__icon--disabled': isDisabled,
                  },
                )}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M2.6665 7.99999C2.6665 7.63181 2.96498 7.33333 3.33317 7.33333H12.6665C13.0347 7.33333 13.3332 7.63181 13.3332 7.99999C13.3332 8.36818 13.0347 8.66666 12.6665 8.66666H3.33317C2.96498 8.66666 2.6665 8.36818 2.6665 7.99999Z"
                />
              </svg>
            </button>

            <span className="cart-item__text">
              {quantity}
            </span>

            <button
              type="button"
              className="cart-item__button"
              onClick={handleIncrease}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                className="cart-item__icon"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  // eslint-disable-next-line max-len
                  d="M8.6665 3.33334C8.6665 2.96515 8.36803 2.66667 7.99984 2.66667C7.63165 2.66667 7.33317 2.96515 7.33317 3.33334V7.33334H3.33317C2.96498 7.33334 2.6665 7.63182 2.6665 8.00001C2.6665 8.3682 2.96498 8.66667 3.33317 8.66667H7.33317V12.6667C7.33317 13.0349 7.63165 13.3333 7.99984 13.3333C8.36803 13.3333 8.6665 13.0349 8.6665 12.6667V8.66667H12.6665C13.0347 8.66667 13.3332 8.3682 13.3332 8.00001C13.3332 7.63182 13.0347 7.33334 12.6665 7.33334H8.6665V3.33334Z"
                />
              </svg>
            </button>
          </div>

          <div className="cart-item__price">
            {`$${newPrice}`}
          </div>
        </div>
      </div>
    </div>
  );
};
