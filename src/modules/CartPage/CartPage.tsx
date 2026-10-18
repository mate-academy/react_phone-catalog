import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useShop } from '../../context/ShopContext';
import { getProducts } from '../../services/products';
import type { Product } from '../../types';

import styles from './CartPage.module.scss';

export const CartPage = () => {
  const {
    cartItems,
    cartQuantities,
    toggleCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useShop();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleCheckout = () => {
    const confirmed = window.confirm('Do you want to complete your purchase?');

    if (confirmed) {
      clearCart();
    }
  };

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Unable to load products'))
      .finally(() => setLoading(false));
  }, []);

  const cartProducts = products.filter(product =>
    cartItems.includes(product.itemId),
  );

  const totalPrice = cartProducts.reduce(
    (total, product) =>
      total + product.price * (cartQuantities[product.itemId] || 1),
    0,
  );

  const totalItems = cartProducts.reduce(
    (total, product) => total + (cartQuantities[product.itemId] || 1),
    0,
  );

  if (loading) {
    return (
      <main className={styles.page}>
        <p>Loading cart...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Cart</h1>

      {cartProducts.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className={styles.layout}>
          <div className={styles.products}>
            {cartProducts.map(product => (
              <div key={product.itemId} className={styles.product}>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => toggleCart(product.itemId)}
                  aria-label={`Remove ${product.name}`}
                >
                  ×
                </button>

                <Link
                  to={`/product/${product.itemId}`}
                  className={styles.productLink}
                >
                  <img
                    src={`/${product.image}`}
                    alt={product.name}
                    className={styles.image}
                  />

                  <span className={styles.productName}>{product.name}</span>
                </Link>

                <div className={styles.quantity}>
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(product.itemId)}
                    disabled={(cartQuantities[product.itemId] || 1) <= 1}
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    −
                  </button>

                  <span>{cartQuantities[product.itemId] || 1}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(product.itemId)}
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    +
                  </button>
                </div>

                <strong className={styles.price}>
                  ${product.price * (cartQuantities[product.itemId] || 1)}
                </strong>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2>${totalPrice}</h2>

            <p>
              Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>

            <div className={styles.divider} />

            <button
              type="button"
              className={styles.checkoutButton}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
