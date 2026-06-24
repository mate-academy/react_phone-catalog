import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { useShop } from '../../context/ShopContext';
import { getProducts } from '../../services/api';
import { Product } from '../../types/catalog';
import { normalizeImagePath } from '../../utils/category';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const {
    cart,
    clearCart,
    decrementCartItem,
    incrementCartItem,
    removeFromCart,
  } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const cartProducts = useMemo(
    () =>
      cart
        .map(item => {
          const product = products.find(entry => entry.itemId === item.itemId);

          return product ? { product, quantity: item.quantity } : null;
        })
        .filter(Boolean) as Array<{ product: Product; quantity: number }>,
    [cart, products],
  );

  const totalQuantity = cartProducts.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartProducts.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const shouldClear = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (shouldClear) {
      clearCart();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className={styles.cartPage}>
      <h1 className={styles.title}>Cart</h1>

      {cartProducts.length === 0 ? (
        <p className={styles.emptyState}>Your cart is empty</p>
      ) : (
        <div className={styles.content}>
          <div className={styles.itemsSection}>
            <div className={styles.list}>
              {cartProducts.map(({ product, quantity }) => (
                <article key={product.itemId} className={styles.item}>
                  <div className={styles.itemLeft}>
                    <button
                      type="button"
                      className={`${styles.button} ${styles.removeButton}`}
                      onClick={() => removeFromCart(product.itemId)}
                      aria-label="Remove item"
                    >
                      ×
                    </button>

                    <img
                      src={normalizeImagePath(product.image)}
                      alt={product.name}
                      className={styles.image}
                    />

                    <div className={styles.itemInfo}>
                      <Link
                        to={`/product/${product.itemId}`}
                        className={styles.itemNameLink}
                      >
                        <h2 className={styles.itemName}>{product.name}</h2>
                      </Link>
                    </div>
                  </div>

                  <div className={styles.itemRight}>
                    <div className={styles.quantityControl}>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.quantityButton}`}
                        onClick={() => decrementCartItem(product.itemId)}
                      >
                        -
                      </button>
                      <span className={styles.quantityValue}>{quantity}</span>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.quantityButton}`}
                        onClick={() => incrementCartItem(product.itemId)}
                      >
                        +
                      </button>
                    </div>

                    <p className={styles.itemPrice}>${product.price}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className={styles.summarySection}>
            <div className={styles.summary}>
              <div className={styles.summaryContent}>
                <h2 className={styles.summaryPrice}>${totalPrice}</h2>
                <p className={styles.summaryText}>
                  Total for {totalQuantity} items
                </p>
              </div>

              <div className={styles.summaryDivider} />

              <button
                type="button"
                className={styles.checkout}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};
