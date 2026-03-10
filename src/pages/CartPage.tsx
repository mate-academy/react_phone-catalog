import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { useCart } from '../contexts/CartContext';
import { useAsync } from '../hooks/useAsync';
import { getProducts } from '../services/api';
import { getAssetUrl } from '../utils/asset';
import styles from './pages.module.scss';

export const CartPage = () => {
  const { items, changeQuantity, removeFromCart, clearCart } = useCart();
  const { data, loading, error } = useAsync(getProducts, []);

  const rows = useMemo(() => {
    const products = data || [];

    return items
      .map(item => ({
        ...item,
        product: products.find(product => product.itemId === item.itemId),
      }))
      .filter(row => row.product);
  }, [items, data]);

  const totalQuantity = rows.reduce((sum, row) => sum + row.quantity, 0);
  const totalAmount = rows.reduce(
    (sum, row) => sum + row.quantity * (row.product?.price || 0),
    0,
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.emptyEr}>Something went wrong</p>;
  }

  if (!rows.length) {
    return <p className={styles.emptyEr}>Your cart is empty</p>;
  }

  return (
    <div className={styles.page}>
      <h1>Cart</h1>

      <div className={styles.cartLayout}>
        <div className={styles.cartList}>
          {rows.map(row => (
            <article className={styles.cartItem} key={row.itemId}>
              <button
                className={styles.cartRemoveBtn}
                type="button"
                onClick={() => removeFromCart(row.itemId)}
                aria-label={`Remove ${row.product?.name} from cart`}
              >
                x
              </button>

              <img
                src={
                  row.product?.image?.startsWith('img/')
                    ? getAssetUrl(row.product.image)
                    : row.product?.image
                }
                alt={row.product?.name}
              />

              <Link className={styles.linkCard} to={`/product/${row.itemId}`}>
                {row.product?.name}
              </Link>

              <div className={styles.qtyBox}>
                <button
                  className={styles.cartQtyBtn}
                  type="button"
                  onClick={() => changeQuantity(row.itemId, row.quantity - 1)}
                  aria-label={`Decrease quantity for ${row.product?.name}`}
                >
                  -
                </button>
                <span className={styles.cartQtyValue}>{row.quantity}</span>
                <button
                  className={styles.cartQtyBtn}
                  type="button"
                  onClick={() => changeQuantity(row.itemId, row.quantity + 1)}
                  aria-label={`Increase quantity for ${row.product?.name}`}
                >
                  +
                </button>
              </div>

              <strong>${(row.product?.price || 0) * row.quantity}</strong>
            </article>
          ))}
        </div>

        <aside className={styles.summary}>
          <h2>${totalAmount}</h2>
          <p>Total for {totalQuantity} items</p>
          <button
            className={styles.checkoutBtn}
            type="button"
            onClick={() => {
              const message =
                'Checkout is not implemented yet. ' +
                'Do you want to clear the Cart?';
              const shouldClear = window.confirm(message);

              if (shouldClear) {
                clearCart();
              }
            }}
          >
            Checkout
          </button>
        </aside>
      </div>
    </div>
  );
};
