import { useMemo, useState } from 'react';
import { CartItem } from '../../components/CartItem/CartItem';
import { GoBack } from '../../components/GoBack/GoBack';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { Message } from '../../components/Message/Message';
import './CartPage.scss';

export const CartPage = () => {
  const { cartItems } = useAppSelector(state => state.cartItems);

  const [isVisible, setIsVisible] = useState(false);

  const totalQuantity = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const handleMessageShow = () => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <div className="cartPage__container">
      {isVisible && <Message />}

      <div className="cartPage__goBack">
        <GoBack />
      </div>

      <h1 className="cartPage__title">Cart</h1>

      {cartItems.length === 0 && (
        <h1>Your cart is empty</h1>
      )}

      {cartItems.length > 0 && (
        <div className="cartPage__items grid grid--block">
          <ul className="
              cartPage__items__list
              grid__item--tablet-1-7
              grid__item--desktop-1-16
            "
          >
            {cartItems.map((item) => (
              <li className="cartPage__items__item" key={item.id}>
                <CartItem cartItem={item} />
              </li>
            ))}
          </ul>

          <div className="
              cartPage__total
              grid__item--desktop-17-24
              grid__item--tablet-8-12
            "
          >
            <h1>{`$${totalPrice}`}</h1>

            <p>{`Total for ${totalQuantity} items`}</p>

            <button
              type="button"
              className="cartPage__button"
              onClick={handleMessageShow}
            >
              Checkout
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
