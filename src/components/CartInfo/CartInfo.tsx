import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { getTotalPrice } from '../../helpers/getTotalPrice';
import './CartInfo.scss';

export const CartInfo = () => {
  const { cartItems } = useContext(CartContext);

  const totalPrice = getTotalPrice(cartItems);

  const productsQuantity = cartItems
    .reduce((total, cartItem) => total + cartItem.quantity, 0);

  return (
    <div className="cart-info grid__item--desktop-17-24">
      <div className="cart-info__box">
        <div className="cart-info__total-price">{`$${totalPrice}`}</div>
        <div className="cart-info__total-quantity">
          {`Total for ${productsQuantity} items`}
        </div>
      </div>
      <button
        className="cart-info__button rectangular-button"
        type="button"
      >
        Checkout
      </button>
    </div>
  );
};
