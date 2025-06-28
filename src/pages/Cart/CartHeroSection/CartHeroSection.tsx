import { BackButton } from '@/components/UI/BackButton';
import styles from './CartHeroSection.module.scss';
import React from 'react';
import { CartProductCard } from '@/components/UI/CartProductCard';
import { useCart } from '@/context/CartContext';

export const CartHeroSection: React.FC = () => {
  const { cart, getTotalPrice, getTotalItems } = useCart();

  return (
    <>
      <BackButton />
      <div className={styles.cartHeroContainer}>
        <h1 className={styles.cartHeroTitle}>Cart</h1>
        {cart.length > 0 ? (
          <div className={styles.cartContentWrapper}>
            <div className={styles.cartItems}>
              {cart.map(product => (
                <CartProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className={styles.cartTotal}>
              <div className={styles.wrapperCartTotal}>
                <h2 className={styles.cartTotalPrice}>${getTotalPrice()}</h2>
                <p
                  className={styles.cartTotalItems}
                >{`Total for ${getTotalItems()} items`}</p>
                <button className={styles.cartTotalBtn}>
                  <p className={styles.cartTotalBtnText}>Checkout</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.emptyStateContainer}>
            <p className={styles.noItemsMessage}>Your cart list is empty.</p>
            <img
              src="img/cart-is-empty.png"
              alt="Cart is empty"
              className={styles.cartNotFoundImg}
            />
          </div>
        )}
      </div>
    </>
  );
};
