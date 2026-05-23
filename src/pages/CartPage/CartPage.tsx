import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  removeFromCart,
  changeQuantity,
  clearCart,
} from '../../features/cart/cartSlice';

import { ConfirmationModalFavorites } from '../../components/ConfirmationModalFavorites/ConfirmationModalFavorites';

import s from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const cart = useAppSelector(state => state.cart.items);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => setIsCheckoutModalOpen(true);

  const confirmCheckout = () => {
    dispatch(clearCart());
    setIsCheckoutModalOpen(false);
  };

  const handleRemoveClick = (id: string) => setItemToDelete(id);

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete));
      setItemToDelete(null);
    }
  };

  return (
    <div className={s.cartPage}>
      {/* Кнопка назад */}
      <div className={s.backButton} onClick={() => navigate(-1)}>
        <img src="./img/Arrow_Left.svg" alt="Back" className={s.backArrow} />
        <span>Back</span>
      </div>

      <h1 className={s.cartTitle}>Cart</h1>

      {cart.length === 0 ? (
        <div className={s.cartEmpty}>Your cart is empty</div>
      ) : (
        <div className={s.cartContainer}>
          <div className={s.cartItems}>
            {cart.map(item => {

              const category = (item as any).category ||
                               (item.id.includes('ipad') ? 'tablets' :
                                item.id.includes('watch') ? 'accessories' : 'phones');

              const productPath = `/${category}/${item.id}`;

              return (
                <div key={item.id} className={s.cartCard}>
                  <button
                    className={s.remove}
                    onClick={() => handleRemoveClick(item.id)}
                  >
                    <img
                      src="./img/Close.svg"
                      alt="Remove"
                      className={s.removeIcon}
                    />
                  </button>

                  <Link to={productPath} className={s.cartCardImageContainer}>
                    <img src={item.image} alt={item.name} />
                  </Link>

                  <Link to={productPath} className={s.productName}>
                    {item.name}
                  </Link>

                  <div className={s.rightSide}>
                    <div className={s.quantity}>
                      <button
                        className={s.minus}
                        onClick={() =>
                          dispatch(changeQuantity({ id: item.id, amount: -1 }))
                        }
                        disabled={item.quantity <= 1}
                      >
                        <img src="./img/Minus.svg" alt="Decrease" />
                      </button>

                      <span className={s.quantityValue}>{item.quantity}</span>

                      <button
                        className={s.plus}
                        onClick={() =>
                          dispatch(changeQuantity({ id: item.id, amount: 1 }))
                        }
                      >
                        <img src="./img/Plus.svg" alt="Increase" />
                      </button>
                    </div>

                    <div className={s.price}>${item.price * item.quantity}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={s.cartSummary}>
            <div className={s.totalPrice}>${total}</div>
            <div className={s.summaryText}>
              Total for {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
            </div>
            <hr className={s.divider} />
            <button className={s.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}

      <ConfirmationModalFavorites
        isOpen={isCheckoutModalOpen}
        message="Checkout is not implemented yet. Do you want to clear the Cart?"
        confirmText="Clear Cart"
        cancelText="Cancel"
        onConfirm={confirmCheckout}
        onCancel={() => setIsCheckoutModalOpen(false)}
      />

      <ConfirmationModalFavorites
        isOpen={!!itemToDelete}
        message="Are you sure you want to remove this item from the cart?"
        confirmText="Remove"
        cancelText="Keep it"
        onConfirm={confirmDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
};
