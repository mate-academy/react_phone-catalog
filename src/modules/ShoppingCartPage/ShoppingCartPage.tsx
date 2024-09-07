import { CartItem } from './components/CartItem';
import { AppContext } from '../../AppContext';
import { useContext, useEffect, useState } from 'react';
import { BackBtn } from '../../components/BackBtn';
import { ModalCheckout } from './components/ModalCheckout';
import classNames from 'classnames';

export const ShoppingCartPage = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const { cartItems, setCartItems } = useContext(AppContext);

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const handleConfirm = () => {
    setCartItems([]);
    setIsCheckout(false);
  };

  const handleCancel = () => {
    setIsCheckout(false);
  };

  useEffect(() => {
    if (isCheckout) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCheckout]);

  return (
    <section className="cart">
      <div className="container">
        <BackBtn className="cart__back-btn" />

        <div className="cart__content">
          <h1 className="cart__title page-title">Cart</h1>

          <ul
            className={classNames('cart__list', {
              'cart__list--empty': cartItems.length === 0,
            })}
          >
            {cartItems.map(product => (
              <li className="cart__item" key={product.id}>
                <CartItem product={product} />
              </li>
            ))}
          </ul>

          <div className="cart__info">
            {cartItems.length > 0 ? (
              <>
                <span className="cart__total-price">{`$${totalPrice}`}</span>
                <p className="cart__info-text">{`Total for ${cartItems.reduce((total, item) => total + item.quantity, 0)} items`}</p>
              </>
            ) : (
              <span className="cart__info-text">Your cart is empty</span>
            )}
            <button
              className="cart__info-btn button"
              type="button"
              onClick={() => setIsCheckout(true)}
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {isCheckout && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setIsCheckout(false)}
          ></div>
          <ModalCheckout onConfirm={handleConfirm} onCancel={handleCancel} />
        </>
      )}
    </section>
  );
};
