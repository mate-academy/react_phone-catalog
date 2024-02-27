/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { CartItemType } from '../../types/CartItemType';
import { StorageContext } from '../StorageContext';

type CartItemProps = {
  cartItem: CartItemType,
  setCartLength: React.Dispatch<number>,
};

export const CartItem: React.FC<CartItemProps> = ({
  cartItem,
  setCartLength,
}) => {
  const {
    id,
    product,
    quantity,
  } = cartItem;
  const {
    cart,
    deleteItemFromCart,
    changeQuantity,
  } = useContext(StorageContext);

  useEffect(() => {
    setCartLength(cart.length);
  }, [quantity]);

  return (
    <div className="cart-item">
      <div
        className="cart-item__delete-button"
        data-cy="cartDeleteButton"
        onClick={() => deleteItemFromCart(id)}
      >
        <img
          src="_new/img/Close.svg"
          alt="delete item button"
          className="cart-item__delete-button-picture"
        />
      </div>

      <div className="cart-item__data">
        <img
          src={`_new/${product.images[0]}`}
          alt=""
          className="cart-item__data-picture"
        />

        <div className="cart-item__data-name">
          {product.name}
        </div>
      </div>

      <div className="cart-item__quantity">
        <div
          className={classNames('cart-item__quantity-button',
            quantity > 1
              ? 'cart-item__quantity-button--on'
              : 'cart-item__quantity-button--off')}
          onClick={() => {
            if (quantity > 1) {
              changeQuantity(cartItem, -1);
            }
          }}
        >
          <img
            src="_new/img/Minus.svg"
            alt=""
            className="cart-item__quantity-button-picture"
          />
        </div>

        <div className="cart-item__quantity-number">
          {quantity}
        </div>

        <div
          className="cart-item__quantity-button
          cart-item__quantity-button--on"
          onClick={() => changeQuantity(cartItem)}
        >
          <img
            src="_new/img/Plus.svg"
            alt=""
            className="cart-item__quantity-button-picture"
          />
        </div>
      </div>

      <div className="cart-item__price">
        {`$${product.priceDiscount}`}
      </div>
    </div>
  );
};
