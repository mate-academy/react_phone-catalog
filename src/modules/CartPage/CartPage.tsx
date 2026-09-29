import { useState } from 'react';
import { useProducts } from '@/shared/context/ProductsContext';
import { useCart } from '@/shared/context/CartContext';

import { AsyncData } from '@/shared/components/AsyncData';

import { BackHeader } from '@/shared/components/BackHeader';
import { CartList } from './components/CartList';

import { EmptyState } from '@/shared/components/EmptyState';
// eslint-disable-next-line max-len
import { ActionButton } from '@/shared/components/Buttons/components/ActionButton';
import { ProductPrice } from '@/shared/components/ProductPrice';
import { Modal } from './components/Modal';

import { EmptyCartImg } from '@/shared/assets/cart-img';
import { itemsText } from '@/utils';

import { ThemeToggle } from '@/shared/components/ThemeToggle';
import './CartPage.scss';

const CHECKOUT_SKELETON = (
  <div className="checkout-block checkout-block--skeleton">
    <div className="checkout-block__total-skeleton" />
    <div className="checkout-block__count-skeleton" />
    <div className="checkout-block__divider" />
    <div className="checkout-block__btn-skeleton" />
  </div>
);

export const CartPage = () => {
  const { cartItems, totalCartItems, totalPrice, clearCart } = useCart();
  const { isLoading, hasError, loadData } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckoutConfirm = () => {
    clearCart();
    setIsModalOpen(false);
  };

  return (
    <div className="cart-page container">
      <div className="cart-page__top-bar">
        <BackHeader catalogTitle="Cart" />
        <ThemeToggle className="product-details__theme-btn" />
      </div>
      <AsyncData hasError={hasError} onRetry={loadData}>
        {isLoading || cartItems.length > 0 ? (
          <div className="cart-page__content">
            <CartList
              cartItems={cartItems}
              className="cart-page__list"
              totalCount={totalCartItems}
              isLoading={isLoading}
            />

            <section className="cart-page__checkout">
              {isLoading ? (
                CHECKOUT_SKELETON
              ) : (
                <div className="checkout-block">
                  <ProductPrice
                    className="checkout-block__total"
                    price={totalPrice}
                  />
                  <div className="checkout-block__count">
                    Total for {totalCartItems} {itemsText(totalCartItems)}
                  </div>
                  <div className="checkout-block__divider" />
                  <ActionButton
                    className="checkout-block__btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Checkout
                  </ActionButton>
                </div>
              )}
            </section>
          </div>
        ) : (
          <EmptyState className="cart-page__empty" title="Your cart is empty">
            <EmptyCartImg />
          </EmptyState>
        )}
      </AsyncData>
      <Modal
        isOpen={isModalOpen}
        title="Checkout"
        message="
        Checkout is not implemented yet. Do you want to clear the Cart?
        "
        confirmLabel="Clear Cart"
        cancelLabel="Cancel"
        onConfirm={handleCheckoutConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};
