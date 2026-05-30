import React, { useCallback, useContext, useMemo } from 'react';
import './ShoppingCartPage.scss';
import { ButtonBack } from '../../shared/ButtonBack';
import { GlobalContext } from '../../context/GlobalContext';
import { CartItem } from '../../shared/CartItem/CartItem';

export const ShoppingCartPage: React.FC = () => {
  const { cart, emptyCart } = useContext(GlobalContext);

  const { totalCount, totalQuantity } = useMemo(() => {
    let cartQuantity = 0;
    let cartCount = 0;

    for (const {
      quantity,
      product: { price },
    } of cart) {
      cartQuantity += quantity;
      cartCount += quantity * price;
    }

    return { totalQuantity: cartQuantity, totalCount: cartCount };
  }, [cart]);

  const handleCheckout = useCallback(() => {
    const confirmed = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      emptyCart();
    }
  }, [emptyCart]);

  return (
    <div className="cart">
      <div className="cart__button-back">
        <ButtonBack />
      </div>
      <h1 className="cart__title">Cart</h1>

      {cart.length ? (
        <div className="cart__container">
          <div className="cart__list">
            {cart.map(cartItem => (
              <CartItem cartItem={cartItem} key={cartItem.itemId} />
            ))}
          </div>

          <div className="cart__total">
            <div className="cart__total-container">
              <div className="cart__total-price">${totalCount}</div>
              <p className="cart__total-text">
                Total for {totalQuantity} items
              </p>
              <div className="cart__divider"></div>
              <button
                className="cart__button-checkout"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart__empty">
          <p className="cart__empty-text">Your cart is empty</p>
          <div className="cart__empty-image-box">
            <img
              src="./img/cart-is-empty.png"
              alt="Empty shopping cart"
              className="cart__empty-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};
