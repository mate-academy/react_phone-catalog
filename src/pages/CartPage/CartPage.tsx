import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import './CartPage.scss';
import { FavAndCartContext } from '../../components/context/FavAndCartContext';
import { CartCard } from '../../components/CartCard';
import emptyCart from '../../assets/icons/EmptyCart.svg';
import { Modal } from '../../components/Modal';

export const CartPage: React.FC = () => {
  const { cart } = useContext(FavAndCartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const navigate = useNavigate();

  const totalItems = useMemo(() => (
    cart.reduce((sum, el) => +sum + +el.quantity, 0)
  ), [cart]);

  const totalPrice = useMemo(() => (
    cart.reduce((sum, el) => +sum + el.price * +el.quantity, 0)
  ), [cart]);

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, []);

  const handleCheckoutClick = useCallback(() => setIsCheckout(true), []);

  return (
    <section className="page__section">
      <div className="container">
        <div className="cart">
          <button
            className="back-btn back-btn--margin"
            type="button"
            onClick={handleBackClick}
            data-cy="backButton"
          >
            Back
          </button>

          <h1 className="cart__title title">Cart</h1>

          {!cart.length ? (
            <div className="cart__empty-wrap">
              <img
                className="cart__empty-img"
                src={emptyCart}
                alt="Empty cart"
              />
              <p className="cart__empty">Your cart is empty</p>
            </div>
          ) : (
            <div className="cart__content">
              <div className="cart__list">
                {cart.map(product => (
                  <CartCard product={product} key={product.phoneId} />
                ))}
              </div>

              <div className="cart__total">
                <span className="cart__total-price">
                  {`$${totalPrice}`}
                </span>

                <span className="cart__total-items">
                  {totalItems === 1 ? (
                    `Total for ${totalItems} item`
                  ) : (
                    `Total for ${totalItems} items`
                  )}
                </span>

                <button
                  type="button"
                  className="cart__checkout"
                  onClick={handleCheckoutClick}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}

          {isCheckout && (
            <Modal setIsCheckout={setIsCheckout} />
          )}
        </div>
      </div>
    </section>
  );
};
