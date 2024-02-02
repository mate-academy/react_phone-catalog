import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../style/CartPage.scss';

export const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    addToCart,
    getCartTotal,
  } = useContext(CartContext);

  const totalItemsCount = cartItems
    .reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="cart cart-margin">
      <Link
        to="/"
        className="cart__button--back-text"
      >
        <div
          className="cart__button--back"
          aria-hidden
          data-cy="backButton"
        >
          <div className="cart__button--back-icon" />

          <span className="cart__button--back-text">Back</span>
        </div>
      </Link>
      <h1 className="cart__title">Cart</h1>
      <div className="cart__container">
        <div className="cart__items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart__item" key={item.id}>
                <button
                  className="cart__clear-button"
                  aria-label="button"
                  type="button"
                  onClick={() => {
                    removeFromCart(item);
                  }}
                />
                <div className="cart__item-content">
                  <img
                    src={
                      `https://mate-academy.github.io/react_phone-catalog/_new/${item.product.image}`
                    }
                    alt={item.product.name}
                    className="cart__item-image"
                  />
                  <h1 className="cart__item-title">{item.product.name}</h1>
                </div>
                <button
                  className="cart__item-control cart__item-control--add"
                  aria-label="button"
                  type="button"
                  onClick={() => {
                    addToCart(item);
                  }}
                />
                <div
                  className="cart__item-quantity"
                  data-cy="productQauntity"
                >
                  {item.quantity}
                </div>
                <button
                  className="cart__item-control cart__item-control--remove"
                  aria-label="button"
                  type="button"
                  onClick={() => {
                    removeFromCart(item);
                  }}
                />
                <div
                  className="cart__item-price"
                >
                  $
                  {getCartTotal()}
                </div>
              </div>
            ))
          ) : (
            <h1 className="cart__empty">Your cart is empty</h1>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart_amounts">
            <h1 className="cart__total-amount">
              $
              {getCartTotal()}
            </h1>
            <p
              className="cart__total"
            >
              {' '}
              Total for
              {totalItemsCount}
              {' '}
              {totalItemsCount === 1 ? 'item' : 'items'}
            </p>

            <div className="cart__border" />

            <button
              type="button"
              className="cart__button"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
