import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { getTotalPrice } from '../../helpers/getTotalPrice';
import './CartInfo.scss';

export const CartInfo = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { cartItems } = useContext(CartContext);

  const totalPrice = getTotalPrice(cartItems);

  const productsQuantity = cartItems
    .reduce((total, cartItem) => total + cartItem.quantity, 0);

  const handleCheckoutClick = () => {
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 3000);
  };

  return (
    <div className="grid__item--desktop-17-24">
      <div className="cart-info">
        <div className="cart-info__box">
          <div className="cart-info__total-price">{`$${totalPrice}`}</div>
          <div className="cart-info__total-quantity" data-cy="productQauntity">
            {`Total for ${productsQuantity} items`}
          </div>
        </div>
        <button
          className="cart-info__button rectangular-button"
          type="button"
          onClick={handleCheckoutClick}
        >
          Checkout
        </button>
      </div>

      {isClicked && (
        <div className="cart-info__warning">
          We are sorry, but this feature is not implemented yet
        </div>
      )}
    </div>
  );
};
