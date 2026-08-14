import React from 'react';
import styles from './CartPage.module.scss';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const navigate = useNavigate();

  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
    totalCount,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      clearCart();
    }
  };

  return (
    <main className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <span className={styles.leftArrow} aria-label="Left arrow" />
        <span className={styles.backText}>Back</span>
      </button>

      <h1 className={styles.title}>Cart</h1>

      <div className={styles.cartContent}>
        <div className={styles.itemsList}>
          {cart.length === 0 && <p>Your cart is empty</p>}
          {cart.map(({ product, quantity }) => (
            <article key={product.id} className={styles.cartItem}>
              <div className={styles.info}>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => removeFromCart(product.id)}
                >
                  <span className={styles.closeIcon} aria-label="Close" />
                </button>
                <Link
                  to={`/product/${product.itemId || product.id}`}
                  className={styles.productLink}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${product.image}`}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <p className={styles.itemName}>{product.name}</p>
                </Link>
              </div>

              <div className={styles.controls}>
                <div className={styles.quantityCounter}>
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(product.id)}
                    className={styles.button}
                    disabled={quantity === 1}
                  >
                    <span className={styles.minusIcon} aria-label="minus" />
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className={styles.button}
                  >
                    <span className={styles.plusIcon} aria-label="plus" />
                  </button>
                </div>
                <span className={styles.price}>
                  ${product.price * quantity}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.checkoutBlock}>
          <h2 className={styles.totalPrice}>${totalPrice}</h2>
          <p className={styles.totalCount}>Total for {totalCount} items</p>
          <hr className={styles.checkoutDivider} />
          <button
            type="button"
            className={styles.checkoutBtn}
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
};
