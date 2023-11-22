import {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Notification } from '../../components/Notification/Notification';
import { BackButton } from '../../components/BackButton/BackButton';
import { NotificationMessage } from '../../types/NotificationMessage';
import { CartItem } from '../../components/CartItem/CartItem';
import { Button } from '../../components/Button/Button';
import { calculateCartTotal } from '../../helpers/calculateCartTotal';

import './CartPage.scss';

export const CartPage: FC = () => {
  const { cartItems } = useAppSelector(store => store.cart);
  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsCheckoutClicked(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isCheckoutClicked]);

  const totalQuantity = useMemo(() => {
    return calculateCartTotal(cartItems, 'quantity');
  },
  [cartItems]);

  return (
    <div className="cart-page">
      <section className="cart">
        <div className="cart__wrapper">
          <BackButton />
          <h1 className="cart__title">Cart</h1>
        </div>

        {!cartItems.length ? (
          <Notification message={NotificationMessage.EmptyCart} />
        ) : (
          <div className="cart__content">
            <div className="cart__items">
              {cartItems.map(item => (
                <CartItem key={item.id} product={item} />
              ))}
            </div>

            <div className="cart__summary">
              <div className="cart__container">
                <div className="cart__total-amount">
                  {`$${calculateCartTotal(cartItems, 'amount')}`}
                </div>
                <div
                  data-cy="productQauntity"
                  className="cart__item-count"
                >
                  {`Total for ${totalQuantity}
                  ${totalQuantity === 1 ? 'item' : 'items'}`}
                </div>
              </div>

              <Button
                className="checkout"
                content="Checkout"
                onClick={() => setIsCheckoutClicked(true)}
              />

              <div
                className={classNames('cart__message', {
                  'cart__message--visible': isCheckoutClicked,
                })}
              >
                <Notification
                  message={NotificationMessage.FeatureNotImplemented}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
