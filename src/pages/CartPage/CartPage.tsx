import { useContext, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';

import { CartContext } from '../../storage/cartContext';
import {
  NotificationContext,
  NotificationStatus,
} from '../../storage/notificationContext';

import './cartPage.scss';

export const CartPage: React.FC = () => {
  const { cart, setCart } = useContext(CartContext);
  const [isCartFilled, setIsCartFilled] = useState(cart.length > 0);
  const [isMessageShown, setIsMessageShown] = useState(false);
  const { setNotification } = useContext(NotificationContext);

  const totalPrice = cart.reduce((acc, { quantity, product }) => {
    return acc + product.price * quantity;
  }, 0);

  const totalQuantity = cart.reduce((acc, { quantity }) => {
    return acc + quantity;
  }, 0);

  const isResetShown = totalQuantity !== cart.length;

  const handleCheckoutMessage = () => {
    setIsMessageShown(true);

    setNotification({
      message: 'We are sorry, but this feature is not implemented yet',
      color: NotificationStatus.Warning,
    });

    setTimeout(() => {
      setIsMessageShown(false);
    }, 2000);
  };

  const handleCartReset = () => {
    setCart([]);
    setNotification({
      message: 'Cart is cleared', color: NotificationStatus.Error,
    });

    setTimeout(() => {
      setIsCartFilled(false);
    }, 300);
  };

  const handleQuantityReset = () => {
    setCart((prev) => prev.map((item) => {
      return {
        ...item,
        quantity: 1,
      };
    }));
  };

  return (
    <div className="cart-page">
      <div className="cart-page__back">
        <BackButton />
      </div>

      <h1 className="cart-page__title">Cart</h1>

      {isCartFilled && (
        <div className="cart-page__actions">
          <button
            type="button"
            className="cart-page__actions-button"
            onClick={handleCartReset}
          >
            Clear all
          </button>

          <CSSTransition
            in={isResetShown}
            timeout={300}
            classNames="reset-fade"
            unmountOnExit
          >
            <button
              type="button"
              className="cart-page__actions-button"
              onClick={handleQuantityReset}
            >
              Reset quantity
            </button>
          </CSSTransition>
        </div>
      )}

      {isCartFilled ? (
        <div className="cart-page__grid">
          <TransitionGroup className="cart-page__cart-items">
            {cart.map((cartItem) => (
              <CSSTransition
                key={cartItem.id}
                timeout={300}
                classNames="cart-item-fade"
                onExited={() => {
                  if (cart.length === 1) {
                    setIsCartFilled(false);
                  }
                }}
              >
                <CartItem key={cartItem.id} item={cartItem} />
              </CSSTransition>
            ))}
          </TransitionGroup>

          <div className="cart-page__cart-checkout-action">
            <div className="cart-page__cart-checkout">
              <div className="cart-page__total">
                <span className="cart-page__total-price">{`$${totalPrice}`}</span>

                <span
                  className="cart-page__total-quantity"
                  data-cy="productQauntity"
                >
                  {`Total for ${totalQuantity} items`}
                </span>
              </div>

              <div className="cart-page__underline" />

              <button
                type="button"
                className="cart-page__checkout-button"
                onClick={handleCheckoutMessage}
                disabled={isMessageShown}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-page__empty">
          <h1 className="cart-page__empty-title">Your cart is empty...</h1>
          <p className="cart-page__empty-description">
            You can always fill it with our products :&#41;
          </p>
        </div>
      )}
    </div>
  );
};
