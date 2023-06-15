import './CartPage.scss';

import { useMemo } from 'react';
import { BackButton } from '../../components/BackButton';
import { CartList } from '../../components/CartList';
import { useAppSelector } from '../../helpers/hooks';

export const CartPage: React.FC = () => {
  const cartItems = useAppSelector(state => state.cart);

  const cartTotalItems = useMemo(
    () => cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0), [cartItems],
  );

  const cartTotalPrice = useMemo(
    () => cartItems.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0), [cartItems],
  );

  return (
    <section className="page__section cart-page">
      <div className="cart-page__container">
        <div className="cart-page__button-back">
          <BackButton />
        </div>

        <h1 className="cart-page__title">
          Cart
        </h1>

        <div className="cart-page__content">
          {(!cartItems.length) ? (
            <h2 className="cart-page__notification">
              Your cart is empty
            </h2>
          ) : (
            <div className="cart-page__cart-list">
              <CartList />
            </div>
          )}

          <div className="cart-page__total-box">
            <h1 className="cart-page__total-price">
              {`$${cartTotalPrice}`}
            </h1>

            <div
              className="cart-page__items-count"
              data-cy="productQauntity"
            >
              {`Total for ${cartTotalItems} items`}
            </div>

            <button
              type="button"
              className="cart-page__action button"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
