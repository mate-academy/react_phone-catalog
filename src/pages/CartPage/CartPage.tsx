import { useContext, useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { CartList } from '../../components/CartList';
import { CartContext } from '../../components/contexts/CartContextProvider';
import { Notification } from '../../components/Notification';
import {
  generateMessage,
  getCartTotalAmount,
  getCartTotalPrice,
} from '../../helpers/calc/helper';
import './style.scss';

const messageText = 'We are sorry, but this feature is not implemented yet';

export const CartPage: React.FC = () => {
  const { cart } = useContext(CartContext);
  const [message, setMessage] = useState('');

  const handleCheckoutClick = () => {
    generateMessage(messageText, setMessage);
  };

  const isCartEmpty = cart?.length === 0;
  const hasCart = cart && !isCartEmpty;

  const totalPrice = getCartTotalPrice(cart || []);
  const totalAmount = getCartTotalAmount(cart || []);

  return (
    <section className="cart-page">
      <BackButton />
      <h2 className="cart-page__title title title--large">
        Cart
      </h2>

      <div className="cart-page__body">
        <div className="cart-page__products">
          {hasCart && (
            <CartList cartProducts={cart} />
          )}

          {isCartEmpty && (
            <h2 className="title title--large">
              Your cart is empty
            </h2>
          )}
        </div>

        <div className="cart-page__action">
          <h3 className="title title--large cart-page__total">
            {`$${totalPrice}`}
          </h3>
          <p className="cart-page__info">
            {`Total for ${totalAmount} items`}
          </p>
          <div className="cart-page__checkout-wrapper">

            <button
              type="button"
              className="cart-page__checkout"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>
          </div>
        </div>

        <div className="cart-page__message">
          <Notification message={message} />
        </div>
      </div>
    </section>
  );
};
