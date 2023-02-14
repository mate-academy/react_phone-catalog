import { useContext } from 'react';
import { BackButton } from '../../components/BackButton';
import { CartItem } from './CartItem';
import {
  CartContext,
} from '../../helpers/SavedItemsContext';
import './CartPage.scss';

export const CartPage = () => {
  const { cartItems } = useContext(CartContext);
  const total = cartItems.length === 0 ? 0 : cartItems.map((item) => {
    const priceAfterDiscount = item.price * ((100 - item.discount) / 100);
    const quantity = item.quantity || 1;

    return priceAfterDiscount * quantity;
  }).reduce((a, b) => a + b);
  let totalItems = 0;

  cartItems.forEach(item => {
    const quantity = item.quantity || 1;

    totalItems += quantity;
  });

  return (
    <div className="container container--with-min-height">
      <div className="cart-page">
        <div className="cart-page__back-button">
          <BackButton />
        </div>
        <div className="cart-page__title">
          <h1 className="main-title">
            Cart
          </h1>
        </div>
        {cartItems.length === 0 ? (
          <h2>Cart is empty</h2>
        ) : (
          <div className="grid">
            <div className="cart-page__cart-items">
              {cartItems.map((cartItem) => (
                <CartItem key={cartItem.id} {...cartItem} />
              ))}
            </div>
            <div className="cart-page__checkout">
              <h1 className="main-title">
                {String.fromCodePoint(0x00024)}
                {total}
              </h1>
              <span className="cart-page__checkout-subtitle">
                {`Total for ${totalItems} items`}
              </span>
              <button
                type="button"
                className="dark-button cart-page__checkout-button"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
