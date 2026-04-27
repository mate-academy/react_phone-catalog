import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeFromCart, changeQuantity } from '../../features/cart/cartSlice';

// Імпортуємо модульні стилі
import s from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cart = useAppSelector(state => state.cart.items);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={s.cartPage}>
      <div className={s.backButton} onClick={() => navigate(-1)}>
        <img
          src="./img/Arrow_Left.svg"
          alt=""
          className={s.backArrow}
        />
        <span>Back</span>
      </div>

      <h1 className={s.cartTitle}>Cart</h1>

      {cart.length === 0 ? (
        <div className={s.cartEmpty}>Your cart is empty</div>
      ) : (
        <div className={s.cartContainer}>
          {/* LEFT - items */}
          <div className={s.cartItems}>
            {cart.map(item => (
              <div key={item.id} className={s.cartCard}>
                <button
                  className={s.remove}
                  onClick={() => dispatch(removeFromCart(item.id))}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <img
                    src="./img/Close.svg"
                    alt=""
                    className={s.removeIcon}
                  />
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
                      aria-label="Decrease quantity"
                    >
                      <img src="./img/Minus.svg" alt="" className={s.minusIcon} />
                    </button>
                    <span className={s.quantityValue}>{item.quantity}</span>
                    <button
                      className={s.plus}
                      onClick={() => dispatch(changeQuantity({ id: item.id, amount: 1 }))}
                      aria-label="Increase quantity"
                    >
                      <img src="./img/Plus.svg" alt="" className={s.plusIcon} />
                    </button>
                  </div>

                  <div className={s.price}>${item.price * item.quantity}</div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - summary */}
          <div className={s.cartSummary}>
            <div className={s.totalPrice}>${total}</div>
            <div className={s.summaryText}>
              Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </div>
            <hr className={s.divider} />
            <button
              className={s.checkoutButton}
              onClick={() => alert('Checkout functionality is coming soon!')}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
