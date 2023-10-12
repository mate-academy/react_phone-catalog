import './cartInfo.scss';
import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContextProvider';
import { getPriceTotalCart } from '../../helpers/getCartPriceTotal';

export const CartInfo = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((total, item) => item.quantity + total, 0);

  const handleCheckoutClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 3000);
  };

  return (
    <div className="cart-info">
      <div className="cart-info__content">
        <div className="cart-info__box">
          <h1 className="cart-info__total-price">
            {`$${getPriceTotalCart(cart)}`}
          </h1>
          <div className="cart-info__total-items">
            {`Total for ${totalItems} ${totalItems > 1 ? 'items' : 'item'}`}
          </div>
        </div>
        <button
          type="button"
          className="cart-info__button"
          onClick={handleCheckoutClick}
        >
          Checkout
        </button>
      </div>

      {isClicked && (
        <h2 className="cart-info__checkout-message">
          We are sorry, but this feature is not implemented yet.
        </h2>
      )}
    </div>

  );
};
