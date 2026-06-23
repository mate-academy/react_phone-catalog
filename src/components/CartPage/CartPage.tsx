import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  clearCart,
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
} from '../../features/cart';
import { CartItem } from '../CartItem/CartItem';
import { useTranslation } from 'react-i18next';

export const CartPage: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectTotalAmount);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(t('checkout-confirm'));

    if (isConfirmed) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="container">
      <div className="cart-page">
        <div className="cart-page__back-btn" onClick={() => navigate(-1)}>
          <div className="cart-page__back-btn-icon"></div>
          <p className="cart-page__back-btn-text">{t('back')}</p>
        </div>

        <h1 className="cart-page__title">{t('cart')}</h1>

        {cartItems.length === 0 ? (
          <p className="cart-page__empty">{t('cart-empty')}</p>
        ) : (
          <div className="cart-page__content">
            <div className="cart-page__list">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="cart-page__summary">
              <div className="cart-page__summary-info">
                <h2 className="cart-page__total-price">${totalAmount}</h2>
                <p className="cart-page__total-count">
                  {t('total-for')} {totalQuantity} {t('items')}
                </p>
              </div>

              <div className="cart-page__checkout-divider"></div>

              <button
                className="cart-page__checkout-btn"
                onClick={handleCheckout}
              >
                {t('checkout')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
