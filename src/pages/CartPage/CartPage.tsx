import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeFromCart, changeQuantity, clearCart } from '../../features/cart/cartSlice';

import s from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cart = useAppSelector(state => state.cart.items);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?'
    );

    if (isConfirmed) {
      dispatch(clearCart());
    }
  };

  return (
    <div className={s.cartPage}>
      <div className={s.backButton} onClick={() => navigate(-1)}>
        <img src="./img/Arrow_Left.svg" alt="" className={s.backArrow} />
        <span>Back</span>
      </div>

      <h1 className={s.cartTitle}>Cart</h1>

      {cart.length === 0 ? (
        <div className={s.cartEmpty}>Your cart is empty</div>
      ) : (
        <div className={s.cartContainer}>
          <div className={s.cartItems}>
            {cart.map(item => (
              <div key={item.id} className={s.cartCard}>
                <button
                  className={s.remove}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <img src="./img/Close.svg" alt="Remove" className={s.removeIcon} />
                </button>

                <div className={s.cartCardImageContainer}>
                  <img src={item.image} alt={item.name} />
                </div>

                <div className={s.productName}>{item.name}</div>

                <div className={s.rightSide}>
                  <div className={s.quantity}>
                    <button
                      className={s.minus}
                      onClick={() => dispatch(changeQuantity({ id: item.id, amount: -1 }))}
                      disabled={item.quantity <= 1}
                    >
                      <img src="./img/Minus.svg" alt="" />
                    </button>

                    <span className={s.quantityValue}>{item.quantity}</span>

                    <button
                      className={s.plus}
                      onClick={() => dispatch(changeQuantity({ id: item.id, amount: 1 }))}
                    >
                      <img src="./img/Plus.svg" alt="" />
                    </button>
                  </div>

                  <div className={s.price}>${item.price * item.quantity}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={s.cartSummary}>
            <div className={s.totalPrice}>${total}</div>
            <div className={s.summaryText}>
              Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </div>
            <hr className={s.divider} />
            <button
              className={s.checkoutButton}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
