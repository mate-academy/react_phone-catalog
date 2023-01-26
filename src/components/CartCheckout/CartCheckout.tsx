import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { CartContext } from '../CartContext';
import './CartCheckout.scss';

export const CartCheckout: React.FC = () => {
  const { cart } = useContext(CartContext);
  const [isError, setIsError] = useState<boolean>(false);

  if (isError) {
    setTimeout(() => setIsError(false), 2000);
  }

  const totalPrice = cart.reduce((sum, item) => {
    const { product, quantity } = item;
    const { price, discount } = product;

    const finalPrice = discount
      ? price * ((100 - discount) / 100)
      : price;

    return sum + (finalPrice * quantity);
  }, 0);

  return (
    <div className="checkout">
      <div className="checkout__content">
        <div className="checkout__price">
          {`$${totalPrice}`}
        </div>
        <div className="checkout__total-items">
          {`Total for ${cart.length} items`}
        </div>

        <div className="checkout__divider" />
        <button
          type="button"
          className="checkout__button"
          onClick={() => setIsError(true)}
        >
          Checkout
        </button>
      </div>
      <div
        className={classNames(
          'checkout__error',
          { 'checkout__error--shown': isError },
        )}
      >
        We are sorry, but this feature is not implemented yet
      </div>
    </div>
  );
};
