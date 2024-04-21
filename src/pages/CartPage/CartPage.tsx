import './CartPage.scss';
import {
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../../components/CartContextProvider';
import { CartItem } from '../../components/CartItem';
import { Notification } from '../../components/Notification';
import { BackButton } from '../../components/BackButton';

export const CartPage = () => {
  const { state } = useLocation();
  const { cart } = useContext(CartContext);
  const [isBuying, setIsBuying] = useState(false);
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (prev, cartItem) => {
        return prev + cartItem.item.price * cartItem.quantity;
      },
      0,
    );
  }, [cart]);
  const totalItems = useMemo(() => {
    return cart.reduce((prev, { quantity }) => {
      return prev + quantity;
    }, 0);
  }, [cart]);

  const onCheckoutClick = useCallback(() => {
    if (!isBuying) {
      setIsBuying(true);

      setTimeout(() => {
        setIsBuying(false);
      }, 3000);
    }
  }, [isBuying]);

  return (
    <div className="cart-page">
      <div className="cart-page__wrapper">
        <div className={classNames('cart-page__notification', {
          'cart-page__notification--active': isBuying,
        })}
        >
          <Notification
            message="We are sorry, but this feature is not implemented yet"
          />
        </div>

        <div className="cart-page__top">
          <BackButton prevLink={state} />

          <h1 className="title">Cart</h1>
        </div>

        {!totalItems && (
          <Notification message="Your cart is empty..." />
        )}

        {!!totalItems && (
          <div className="cart-page__content">
            <ul className="cart-page__items">
              {cart.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>

            <section className="cart-page__checkout">
              <div className="cart-page__total">
                <span className="cart-page__total-price">
                  {`$${totalPrice}`}
                </span>
                <p
                  className="cart-page__total-quantity"
                  data-cy="productQauntity"
                >
                  {`Total fro ${totalItems} items`}
                </p>
              </div>

              <span className="cart-page__checkout-divider" />

              <button
                className="button cart-page__button"
                type="button"
                onClick={onCheckoutClick}
              >
                Checkout
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
