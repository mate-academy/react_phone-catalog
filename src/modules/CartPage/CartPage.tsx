/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectToCart } from '../../state/cartSlice';
import { CartItem } from './components/CartItem/CartItem';
import '../CartPage/CartPage.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const link = useNavigate();
  const cartState = useSelector(selectToCart);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const popupState = () => setIsPopupVisible(!isPopupVisible);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = cartState.reduce(
    (acc, item) => {
      acc.sum += item.product.price * item.quantity;
      acc.count += item.quantity;

      return acc;
    },
    { sum: 0, count: 0 },
  );

  return (
    <>
      {cartState.length > 0 ? (
        <>
          <main className="cart">
            <nav className="cart__breadcrumbs">
              <BreadCrumbs />
            </nav>
            <button
              className="cart__back_button"
              onClick={() => link('phones')}
            >
              &lt; Back
            </button>
            <h1 className="cart__title">Cart</h1>
            <section className="cart__section">
              <div className="cart__products">
                {cartState.map(product => (
                  <CartItem
                    product={product.product}
                    quantity={product.quantity}
                    key={product.id}
                  />
                ))}
              </div>
              <div className="checkout">
                <h2 className="checkout__price">${total.sum.toFixed(2)}</h2>
                <p className="checkout__items">Total for {total.count} items</p>
                <div className="checkout__divider"></div>
                <button
                  className="checkout__button"
                  aria-label="Proceed to checkout"
                  onClick={popupState}
                >
                  Checkout
                </button>
              </div>
            </section>

            {isPopupVisible && (
              <div className="popup">
                <div className="popup-content">
                  <p>
                    Checkout is not implemented yet. <br />
                    Do you want to clear the Cart?
                  </p>
                  <div className="popup__buttons">
                    <button onClick={handleClearCart} className="popup-close">
                      Confirm
                    </button>
                    <button onClick={popupState} className="popup-close">
                      Close
                    </button>
                  </div>
                </div>
                <div className="popup-overlay" onClick={popupState}></div>
              </div>
            )}
          </main>
        </>
      ) : (
        <p className="cart__empty">Your cart is empty</p>
      )}
    </>
  );
};
