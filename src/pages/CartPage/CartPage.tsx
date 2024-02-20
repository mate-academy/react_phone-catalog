import classNames from 'classnames';
import { useState } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import { CartItem } from '../../components/CartItem/CartItem';
import { NoProducts } from '../../components/NoProducts/NoProducts';
import { useAppContext } from '../../store/AppContext';
import './CartPage.scss';

export const CartPage = () => {
  const { state: { cart } } = useAppContext();
  const [showMessage, setShowMessage] = useState(false);

  const quantity = cart.length;
  const totalQuantity = cart
    .reduce((accumulator, item) => accumulator + item.quantity, 0);
  const totalPrice = cart
    .reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-page__top-section">
        <BackButton />
        <h1 className="cart-page__title">Cart</h1>
      </div>

      <div className="cart-page__main-content">
        {quantity === 0 && (
          <NoProducts>
            Your cart is empty.
          </NoProducts>
        )}

        {quantity !== 0 && (
          <div className="cart-page__cart">
            <ul className="cart-page__cart-list">
              {cart.map(cartItem => (
                <CartItem
                  key={cartItem.id}
                  product={cartItem}
                />
              ))}
            </ul>

            <div
              className="cart-page__chekout"
            >
              <div className="cart-page__chekout-box">
                <div className="cart-page__chekout-top">
                  <span className="cart-page__chekout-price">{`$${totalPrice}`}</span>
                  <span
                    className="cart-page__chekout-quantity"
                    data-cy="productQauntity"
                  >
                    {`Total for ${totalQuantity} item${totalQuantity !== 1 ? 's' : ''}`}
                  </span>
                </div>

                <button
                  type="button"
                  className="cart-page__checkout-button"
                  onClick={() => setShowMessage(!showMessage)}
                >
                  Checkout
                </button>
              </div>

              <div
                className={classNames('cart-page__checkout-message', {
                  'cart-page__checkout-message--is-open': showMessage,
                })}
              >
                <span
                  className="cart-page__checkout-message-text"
                >
                  We are sorry, but this feature is not implemented yet
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
