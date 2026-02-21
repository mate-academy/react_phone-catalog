/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartCard from '../../componenst/CartCard';
import CartSummary from '../../componenst/CartSummary';
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initialQuantities: Record<string, number> = {};

    cart.forEach(product => {
      initialQuantities[product.id] = 1;
    });

    return initialQuantities;
  });

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity,
    }));
  };

  const handleCheckout = () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <section className={styles.cartPage}>
        <h1 className={styles.cartPage__title}>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products/phones">Browse products</Link>
      </section>
    );
  }

  return (
    <section className={styles.cartPage}>
      <h1 className={styles.cartPage__title}>Cart</h1>
      {cart.length > 0 && (
        <p className={styles.cartPage__counter}>
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </p>
      )}
      <div className={styles.cartPage__content}>
        <div className={styles.cartPage__list}>
          {cart.map(product => (
            <CartCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 1}
              onRemove={() => removeFromCart(product.id)}
              onQuantityChange={(newQuantity: number) =>
                handleQuantityChange(product.id, newQuantity)
              }
            />
          ))}
        </div>

        <CartSummary
          products={cart}
          quantities={quantities}
          onCheckout={handleCheckout}
        />
      </div>
    </section>
  );
};

export default Cart;
