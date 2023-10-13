import { useContext } from 'react';
import { ArrowBack } from '../../components/ArrowBack';
import { CartContext } from '../../helpers/LocaleStorageContext';
import { NotificationContext } from '../../helpers/ErrorContext';
import { CartItem } from '../../components/CartItem';
import { calculatePrice } from '../../helpers/different';
import { NoResults } from '../../components/NoResults';

import './CartPage.scss';

export const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const { setNotification } = useContext(NotificationContext);

  const totalPrice = cart.reduce(
    (acc, cartItem) => acc + (calculatePrice(
      cartItem.product.price, cartItem.product.discount,
    )) * cartItem.quantity,
    0,
  );

  const handleNotImplemented = () => (
    setNotification('We are sorry, but this feature is not implemented yet')
  );

  const handleDeleteItem = (productId: string) => () => {
    setCart(
      cart.filter((item) => item.id !== productId),
    );
  };

  const handleClickPlus = (productId: string) => () => {
    setCart(
      cart.map((item) => (item.id === productId
        ? {
          id: item.id,
          quantity: item.quantity + 1,
          product: item.product,
        }
        : item)),
    );
  };

  const handleClickMinus = (productId: string) => () => {
    setCart(
      cart.map((item) => (item.id === productId
        ? {
          id: item.id,
          quantity: item.quantity - 1,
          product: item.product,
        }
        : item)),
    );
  };

  return (
    <section className="cart">
      <div className="main-container">
        {cart.length > 0
          ? (
            <>
              <ArrowBack />

              <h1>Cart</h1>

              <div className="grid grid--desktop">
                <div
                  className="
                    cart__items
                    grid__item--desktop-1-16
                  "
                >
                  {cart.map(cartItem => (
                    <CartItem
                      cartItem={cartItem}
                      handleDeleteItem={handleDeleteItem}
                      handleClickPlus={handleClickPlus}
                      handleClickMinus={handleClickMinus}
                    />
                  ))}
                </div>

                <div
                  className="
                    cart__total
                    grid__item--desktop-17-24
                  "
                >
                  <h2 className="cart__total-price">
                    {`$${totalPrice}`}
                  </h2>

                  <p className="cart__length">
                    {`Total for ${cart.length} items`}
                  </p>

                  <div className="line" />

                  <button
                    type="button"
                    className="cart__checkout"
                    onClick={handleNotImplemented}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )
          : (
            <NoResults
              text="Your cart is empty"
            />
          )}

      </div>
    </section>
  );
};
