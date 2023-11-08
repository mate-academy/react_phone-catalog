import { useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { CartItem } from '../../components/CartItem';
import { Message } from '../../components/Message';
import { GoBack } from '../../components/GoBack';
import { ButtonType } from '../../types/ButtonType';
import { useAppSelector } from '../../utils/hooks/hooks';
import './CartPage.scss';

export const CartPage = () => {
  const { cartItems } = useAppSelector((state) => state.cartItems);
  const [isVisible, setIsVisible] = useState(false);

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
    <div className="page container">
      {isVisible && <Message />}

      <div className="page__go-back">
        <GoBack />
      </div>

      {cartItems.length === 0 ? (
        <h1>Your cart is empty</h1>
      ) : (
        <div className="section">
          <h1 className="section__title">Cart</h1>
          <div className="cart-page__container grid grid--block">
            <ul className="cart-page__list grid__item--desktop-1-16">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <CartItem cartItem={item} />
                </li>
              ))}
            </ul>

            <div className="cart-page__total grid__item--desktop-17-24">
              <h1>{`$${totalPrice}`}</h1>

              <p>{`Total for ${cartItems.length} items`}</p>

              <Button
                content={ButtonType.TEXT}
                className="cart-page__button"
                onClick={handleMessageShow}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
