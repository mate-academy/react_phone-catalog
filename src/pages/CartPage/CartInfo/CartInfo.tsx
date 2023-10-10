import { useContext, useState } from 'react';

import { CartContext } from '../../../contexts/CartContextProvider';
import { getCartPrice } from '../../../helpers/getCartPrice';

import './CartInfo.scss';

export const CartInfo = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((total, currentItem) => (
    currentItem.quantity + total
  ), 0);

  const handleCheckoutClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 3000);
  };

  return (
    <div className="cart-info">
      <div className="cart-info__content">
        <div className="cart-info__total-price">
          <h1>
            {`$${getCartPrice(cart)}`}
          </h1>

          <div className="cart-info__total-price--quantity">
            {`
              Total for
              ${totalItems}
              ${totalItems <= 1 ? 'item' : 'items'}
            `}
          </div>
        </div>

        <div className="cart-info__bottom">
          <button
            type="button"
            className="cart-info--button"
            onClick={handleCheckoutClick}
          >
            Checkout
          </button>

          {isClicked && (
            <h2 className="cart-info--checkout-text">
              {'Sorry, this feature isn\'t inplement yet'}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};
