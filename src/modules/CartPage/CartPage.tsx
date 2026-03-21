import React from 'react';
import { useCart } from '@/context/CartContext';
import styles from './CartPage.module.scss';
import cn from 'classnames';
import { Heading } from '@/components/ui/Heading';
import { BackButton } from '@/components/ui/BackButton';
import { Product } from '@/types/Product';

import CloseIcon from '@/assets/icons/Close.svg?react';
import PlusIcon from '@/assets/icons/Plus.svg?react';
import MinusIcon from '@/assets/icons/Minus.svg?react';
import { ButtonPrimary } from '../shared/ui/ButtonPrimary';
import { EmptyState } from '../shared/components/EmptyState';
import emptyCart from '@/assets/img/EmptyCart.png';

export interface CartItem {
  itemId: string;
  quantity: number;
  product: Product;
}

export const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalAmount,
    totalQuantity,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    const confirmClear = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmClear) {
      clearCart();
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <EmptyState
          title="Your cart is empty"
          imgUrl={emptyCart}
          text="But it doesn't have to be! Check out our latest gadgets."
          showCategories={true}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BackButton />
      <Heading as="h1">Cart</Heading>

      <div className={styles.content}>
        <div className={styles.itemList}>
          {cartItems.map(item => (
            <div key={item.itemId} className={styles.item}>
              <div
                className={cn(styles.item__wrapper, styles.item__wrapperLeft)}
              >
                <button
                  type="button"
                  className={styles.item__remove}
                  onClick={() => removeFromCart(item.itemId)}
                  aria-label="Remove item"
                >
                  <CloseIcon className={styles.item__icon} />
                </button>
                <div className={styles.item__imgWrapper}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className={styles.item__img}
                  />
                </div>
                <p className={styles.item__name}>{item.product.name}</p>
              </div>

              <div
                className={cn(styles.item__wrapper, styles.item__wrapperRight)}
              >
                <div className={styles.item__quantity}>
                  <button
                    className={cn(styles.item__quantityBtn, {
                      [styles.item__quantityBtnDisabled]: item.quantity <= 1,
                    })}
                    onClick={() => updateQuantity(item.itemId, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <MinusIcon className={styles.item__icon} />
                  </button>

                  <span className={styles.item__quantityCount}>
                    {item.quantity}
                  </span>

                  <button
                    className={styles.item__quantityBtn}
                    onClick={() => updateQuantity(item.itemId, 1)}
                  >
                    <PlusIcon className={styles.item__icon} />
                  </button>
                </div>

                <p className={styles.item__price}>
                  ${item.product.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.summary__price}>
            <h3 className={styles.summary__totalPrice}>${totalAmount}</h3>
            <p className={styles.summary__totalCount}>
              Total for {totalQuantity} items
            </p>
          </div>
          <div className={styles.summary__divider} />
          <ButtonPrimary
            onClick={handleCheckout}
            className={styles.btnCheckout}
          >
            Checkout
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};
