import { useState } from 'react';
import { BackButton } from '../components/BackButton';
import { ProductInCart } from '../components/ProductInCart';
import { useCartContext } from '../context/CartContext';
import './CartPage.scss';

export const CartPage = () => {
  const [message, setMessage] = useState(false);
  const { cart } = useCartContext();
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 0,
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity, 0,
  );

  const handleCheckout = () => {
    setMessage(true);

    const timerId = setTimeout(() => setMessage(false), 5000);

    return () => clearTimeout(timerId);
  };

  return (
    <div className="cart-page">
      <div className="cart-page__back-link">
        <BackButton />
      </div>

      <h1 className="cart-page__title">
        Cart
      </h1>

      <div className="cart-page__content">
        {cart.length !== 0 ? (
          <>
            <div className="cart-page__products">
              {cart.map(item => (
                <ProductInCart cart={item} key={item.id} />
              ))}
            </div>

            <div className="cart-page__checkout">
              <div className="cart-page__total">
                {`$${total}`}
              </div>

              <div className="cart-page__total-items">
                {`Total for ${totalItems} items`}
              </div>

              <button
                type="button"
                className="cart-page__button"
                onClick={handleCheckout}
              >
                Checkout
              </button>

              {message && (
                <div className="cart-page__message">
                  We are sorry, but this feature is not implemented yet
                </div>
              )}
            </div>
          </>
        ) : (
          'Your cart is empty'
        )}
      </div>
    </div>
  );
};
