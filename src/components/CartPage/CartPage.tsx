import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { CartItem } from '../CartItem';

import './CartPage.scss';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  if (!cart.length) {
    return (
      <div className="cart-page__empty">
        <img
          className="cart-page__empty-image"
          src="img/cart-is-empty.png"
          alt="Cart is empty"
        />

        <h2 className="cart-page__empty-title">Your cart is empty</h2>
      </div>
    );
  }

  const handleCheckOut = () => {
    const confirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <>
      <button
        type="button"
        className="cart-page__back"
        onClick={() => navigate(-1)}
      >
        <img
          className="cart-page__back-icon cart-page__back-icon--default"
          src={
            theme === 'dark'
              ? 'img/icons/arrow-left.svg'
              : 'img/icons-light/arrow-left-light.svg'
          }
          alt="Back arrow"
        />
        <img
          className={'cart-page__back-icon ' + 'cart-page__back-icon--hover'}
          src="img/icons/arrow-left_hover.svg"
          alt="Back arrow"
        />
        Back
      </button>

      <h1 className="cart-page__title">Cart</h1>

      <div className="cart-page__content">
        <div className="cart-page__items">
          {cart.map(item => (
            <CartItem
              key={item.product.id}
              item={item}
              onRemove={removeFromCart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
            />
          ))}
        </div>

        <div className="cart-page__summary">
          <h2 className="cart-page__total">${totalPrice}</h2>

          <p className="cart-page__count">Total for {totalQuantity} items</p>

          <button
            type="button"
            className="cart-page__checkout"
            onClick={handleCheckOut}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};
