import React, { useState } from 'react';
import { useCart } from '../../contexts';
import { Button } from '../shared';
import { CartItem } from './components/CartItem';
import styles from './CartPage.module.scss';
import { Icon } from '../shared/components/Icon/Icon';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const {
    items,
    getTotalPrice,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalCount,
  } = useCart();
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const { t } = useTranslation();

  const handleDoubleClick = (itemId: string) => {
    const cartItem = items.find(
      currentItem => currentItem.product.itemId === itemId,
    );

    if (cartItem) {
      setEditingItemId(itemId);
      setEditValue(cartItem.quantity.toString());
    }
  };

  const handleInputChange = (value: string) => {
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setEditValue(value);
    }
  };

  const finishEditing = () => {
    if (editingItemId) {
      const newQuantity = parseInt(editValue, 10);
      const currentItem = items.find(
        cartItem => cartItem.product.itemId === editingItemId,
      );

      if (
        newQuantity &&
        newQuantity > 0 &&
        currentItem &&
        newQuantity !== currentItem.quantity
      ) {
        updateQuantity(editingItemId, newQuantity);
      }

      setEditingItemId(null);
      setEditValue('');
    }
  };

  const handleInputBlur = () => {
    finishEditing();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      setEditingItemId(null);
      setEditValue('');
    }
  };

  const handleCheckout = () => {
    const shouldClearCart = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (shouldClearCart) {
      clearCart();
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.cart__page}>
        <div className={styles.cart__page__top}>
          <Button
            variant="icon"
            noBorder
            onClick={() => {
              navigate(-1);
            }}
          >
            <Icon name="arrow-left" />
            {t('common.back')}
          </Button>
          <h2 className={styles.cart__title}>{t('cart.title')}</h2>
        </div>
        {items.length === 0 ? (
          <div className={styles.cart__empty}>
            <p className={styles.cart__empty__message}>{t('cart.empty')}</p>
          </div>
        ) : (
          <>
            <div className={styles.cart}>
              <ul className={styles.cart__list}>
                {items.map(cartItem => (
                  <CartItem
                    key={cartItem.product.itemId}
                    item={cartItem}
                    isEditing={editingItemId === cartItem.product.itemId}
                    editValue={editValue}
                    onRemove={removeFromCart}
                    onIncrement={incrementQuantity}
                    onDecrement={decrementQuantity}
                    onDoubleClick={handleDoubleClick}
                    onInputChange={handleInputChange}
                    onInputBlur={handleInputBlur}
                    onKeyPress={handleKeyPress}
                  />
                ))}
              </ul>
            </div>
            <div className={styles.cart__checkout}>
              <h3 className={styles['cart__checkout-total-price']}>
                ${getTotalPrice()}
              </h3>
              <h3 className={styles['cart__checkout-item-count']}>
                {t('cart.totalFor', { count: getTotalCount() })}
              </h3>
              <Button
                variant="primary"
                fullWidth
                className={styles['cart__checkout-button']}
                onClick={handleCheckout}
              >
                {t('cart.checkout')}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
