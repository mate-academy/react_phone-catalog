/* eslint-disable max-len */
import './Cart.scss';
import { useCart } from './CartContext';
import { Empty } from '../Empty';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section
      className={classNames('cart', { 'cart--empty': cart.length === 0 })}
    >
      {cart.length === 0 ? (
        <Empty />
      ) : (
        <>
          <div className="cart__top">
            <div className="cart__top-button">
              <span className="icon icon--arrow-up icon--arrow-up--rotate"></span>

              <button
                type="button"
                className="cart__top-button--back text__body"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>

            <h2 className="category__title text text__title">Cart</h2>
          </div>

          <div className="cart__list">
            {cart.map(item => (
              <div className="cart__item" key={item.id}>
                <div className="cart__item-top">
                  <button
                    className="cart__item-remove icon icon--cross"
                    onClick={() => removeFromCart(item.id)}
                  ></button>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart__item-image"
                  />

                  <h3 className="cart__item-title text text__body">
                    {item.name}
                  </h3>
                </div>

                <div className="cart__item-bottom">
                  <div className="cart__item-quantity">
                    <button
                      className={classNames(
                        'cart__item-quantity--button text icon icon--minus',
                        { 'icon--minus-disabled': item.quantity <= 1 },
                      )}
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    ></button>

                    <span className="cart__item-quantity--value text text__body">
                      {item.quantity}
                    </span>

                    <button
                      className="cart__item-quantity--button text icon icon--plus"
                      onClick={() => increaseQuantity(item.id)}
                    ></button>
                  </div>

                  <p className="cart__item-price text">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {cart.length > 0 && (
        <div className="cart__total">
          <div className="cart__total-top">
            <h3 className="cart__total-top--price text text__title">
              ${totalPrice}
            </h3>

            <p className="cart__total-top--items text text__body">
              Total for {totalItems} itmes
            </p>
          </div>

          <div className="cart__total-bottom">
            <button
              className="cart__total-bottom--checkout text text__body--buttons"
              onClick={clearCart}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
