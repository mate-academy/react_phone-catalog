import React, { useContext, useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { CartItem } from '../../components/CartItem/CartItem';
import { CartContext } from '../../context/CartContext';
import './CartPage.scss';

export const CartPage: React.FC = () => {
  const { cart } = useContext(CartContext);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  const totalSum = cart
    .map(item => item.quantity * item.product.price)
    .reduce((sum, current) => sum + current, 0);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutMessage = () => {
    setShowCheckoutMessage(true);

    setTimeout(() => {
      setShowCheckoutMessage(false);
    }, 3000);
  };

  return (
    <div className="CartPage">
      <div className="container">
        <div className="CartPage__content">
          <div className="CartPage__top">
            <BackButton />
            <h2 className="CartPage__title">
              Cart
            </h2>
          </div>

          {!cart.length && (
            <span className="CartPage__is-empty">Your cart is empty</span>
          )}
          <div className="CartPage__main">
            <ul className="CartPage__list">
              {cart.map(cartItem => (
                <CartItem
                  key={cartItem.product.itemId}
                  item={cartItem}
                />
              ))}
            </ul>

            {!!cart.length && (
              <div className="CartPage__checkout">
                <div className="CartPage__checkout-main">
                  <div className="CartPage__checkout-info">
                    <span className="CartPage__checkout-sum">
                      &#36;
                      {totalSum}
                    </span>
                    <p
                      className="CartPage__checkout-text"
                      data-cy="productQauntity"
                    >
                      {`Total for ${totalQuantity} item${totalQuantity === 1 ? '' : 's'}`}
                    </p>
                  </div>

                  <div className="Decorative-line" />

                  <button
                    type="button"
                    className="CartPage__checkout-button"
                    onClick={handleCheckoutMessage}
                  >
                    Checkout
                  </button>
                </div>

                {showCheckoutMessage && (
                  <div className="CartPage__checkout-message">
                    We are sorry, but this feature is not implemented yet
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
