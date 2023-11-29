import './CartPage.scss';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Notification } from '../../components/Notification/Notification';
import { CartItemBlock } from '../../components/CartItemBlock/CartItemBlock';
import { BackButton } from '../../components/BackButton/BackButton';

export const CartPage: React.FC = () => {
  const cart = useAppSelector((state) => state.cart.cart);

  const [isCheckout, setIsCheckout] = useState(false);

  const totalPrice = cart.reduce((sum, obj) => {
    return obj.price * obj.quantity + sum;
  }, 0);

  const totalCount = cart.reduce((sum, obj) => {
    return obj.quantity + sum;
  }, 0);

  useEffect(() => {
    if (isCheckout) {
      const timeoutId = setTimeout(() => {
        setIsCheckout(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    return undefined;
  }, [isCheckout]);

  return (
    <section className="cart">
      <BackButton />
      {cart.length <= 0 ? (
        <>
          <Notification message="Cart is empty" />
        </>
      ) : (
        <>
          <h1>Cart</h1>
          <div className="cart__container">
            <div className="cart__list">
              {cart.map((item) => (
                <CartItemBlock key={item.id} item={item} />
              ))}
            </div>
            <div className="cart__checkout">
              <div className="cart__total-price">{`$${totalPrice}`}</div>
              <div className="cart__total-price__quantity">
                {`Total for
                ${totalCount} items`}
              </div>
              <button
                type="button"
                className="cart__button-checkout"
                onClick={() => setIsCheckout(true)}
              >
                Checkout
              </button>
              {isCheckout && (
                <div className="cart__error">
                  <Notification message="This function is not available yet." />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
