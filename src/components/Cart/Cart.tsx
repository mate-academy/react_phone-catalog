import ReactLoading from 'react-loading';
import { useRef } from 'react';
import { BackButton } from '../UI/BackButton';
import { CartItem } from './CartItem';
import './Cart.scss';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getProductPrices } from '../../helpers/getProductPrices';
import { NotFound } from '../NotFound/NotFound';

export const Cart = () => {
  const cart = useAppSelector(state => state.cart);
  const checkoutMessage = useRef<HTMLHeadingElement>(null);
  const isLoaded = true;

  const getCartTotalSum = () => {
    return cart.reduce((sum, cartItem) => {
      const { currentPrice } = getProductPrices(cartItem.product);

      return sum + (currentPrice * cartItem.quantity);
    }, 0);
  };

  const checkout = () => {
    if (checkoutMessage.current) {
      checkoutMessage.current.classList.remove('hidden');

      setTimeout(() => {
        if (checkoutMessage.current) {
          checkoutMessage.current.classList.add('hidden');
        }
      }, 3000);
    }
  };

  return (
    <>
      {!isLoaded ? (
        <ReactLoading type="bubbles" color="#313237" />
      ) : (
        <div className="cart">
          <div className="cart__back">
            <BackButton />
          </div>
          <h1 className="cart__title">Cart</h1>
          {cart.length === 0 ? (
            <NotFound>Your cart is empty</NotFound>
          ) : (
            <div className="cart__container">
              <div className="cart__items">
                {cart.map(item => (
                  <CartItem key={item.id} cartItem={item} />
                ))}
              </div>
              <div className="cart__total-container">
                <div className="cart__total">
                  <h1 className="cart__total-price">{`$${getCartTotalSum()}`}</h1>
                  <span className="cart__items-count">{`Total for ${cart.length} items`}</span>
                  <button
                    type="button"
                    className="cart__checkout"
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                </div>
                <h3
                  ref={checkoutMessage}
                  className="cart__checkout-message hidden"
                >
                  We are sorry, but this feature is not implemented yet
                </h3>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
