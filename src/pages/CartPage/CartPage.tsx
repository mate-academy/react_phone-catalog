import { useContext, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem';

import { CartContext } from '../../storage/cartContext';

import './cartPage.scss';

export const CartPage: React.FC = () => {
  const { cart, setCart } = useContext(CartContext);
  const [isMessageShown, setIsMessageShown] = useState(false);

  const totalPrice = cart.reduce((acc, { quantity, product }) => {
    return acc + product.price * quantity;
  }, 0);

  const totalQuantity = cart.reduce((acc, { quantity }) => {
    return acc + quantity;
  }, 0);

  const handleCheckoutMessage = () => {
    setIsMessageShown(true);

    setTimeout(() => {
      setIsMessageShown(false);
    }, 2500);
  };

  const handleCartReset = () => {
    setCart([]);
  };

  return (
    <div className="cart-page">
      <div className="cart-page__back">
        <BackButton />
      </div>

      <h1 className="cart-page__title">Cart</h1>

      {cart.length > 0 && (
        <button
          type="button"
          className="cart-page__clear-all"
          onClick={handleCartReset}
        >
          Clear all
        </button>
      )}

      {cart.length > 0 ? (
        <div className="cart-page__grid">
          <div className="cart-page__cart-items">
            {cart.map((cartItem) => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))}
          </div>

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

              <CSSTransition
                in={isMessageShown}
                timeout={500}
                classNames="checkout-message-fade"
                unmountOnExit
              >
                <div className="cart-page__cart-checkout-message">
                  We are sorry, but this feature is not implemented yet
                </div>
              </CSSTransition>
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
