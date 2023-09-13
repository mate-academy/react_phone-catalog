/* eslint-disable max-len */
import { useContext, useState } from 'react';
import classNames from 'classnames';
import { CartContext } from '../context/CartContext';

export const CartPage = () => {
  const [message, setMessage] = useState(false);
  const {
    cartItems,
    removeItemFromCart,
    cartTotalPrice,
    cartCount,
    plusItem,
    minusItem,
  } = useContext(CartContext);

  return (
    <div className="container">

      <div className="cart">
        <div className="cart__top">
          <button
            type="button"
            className="details__back"
            data-cy="backButton"
            onClick={() => window.history.back()}
          >
            <span className="arrow arrow--left-disabled" />
            <span className="details__back--span">Back</span>
          </button>
          <h1 className="cart__title">Cart</h1>
        </div>

        <div className="cart__main">
          {cartItems.length > 0 ? (
            <>
              <div className="cart__items-container">
                {cartItems.map(item => (
                  <div key={item.id} className="cart__item">
                    <div className="cart__item-info">
                      <button
                        type="button"
                        className="cart__item-delete"
                        data-cy="cartDeleteButton"
                        onClick={() => removeItemFromCart(item)}
                      >
                        <div className="cart__item-delete--cross" />
                      </button>

                      <div className="cart__image-block">
                        <img
                          src={`../_new/${item.product.image}`}
                          alt={item.product.name}
                          className="cart__image-block--img"
                        />
                      </div>

                      <p className="cart__item-name">{item.product.name}</p>

                      <div className="cart__quantity">
                        <button
                          type="button"
                          className={classNames('cart__quantity-minus',
                            { 'cart__quantity-minus--disabled': item.quantity === 1 })}
                          onClick={() => minusItem(item)}
                        >
                          <div className={classNames('cart__quantity-minus--minus',
                            {
                              'cart__quantity-minus--minus-disabled': item.quantity === 1,
                            })}
                          />
                        </button>

                        <span className="cart__quantity--quantity">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          className="cart__quantity-plus"
                          onClick={() => plusItem(item)}
                        >
                          <div className="cart__quantity-plus--plus" />
                        </button>
                      </div>
                    </div>

                    <p className="cart__price">{`$${item.price}`}</p>

                  </div>
                ))}
              </div>

              <div className="cart__total">
                <div className="cart__total-info">
                  <p className="cart__total-price">{`$${cartTotalPrice}`}</p>
                  <p className="cart__total-items" data-cy="productQauntity">
                    {`Total for ${cartCount} items`}
                  </p>
                </div>

                <div className="cart__checkout">
                  <button
                    type="button"
                    className="cart__checkout-btn"
                    onClick={() => setMessage(true)}
                  >
                    <p className="cart__checkout-btn--text">Checkout</p>
                  </button>
                  {message && (
                    <div className="notification">
                      <p className="notification--text">
                        We are sorry, but this feature is not implemented yet
                      </p>
                      <button
                        type="button"
                        className="notification__close"
                        onClick={() => setMessage(false)}
                      >
                        <div className="notification__close--cross" />
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      </div>
    </div>

  );
};
