import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../shared/context';
import { getProducts } from '../shared/api/apiClient';
import { useAsync } from '../shared/hooks/useAsync';
import { Loader } from '../shared/components/Loader';
import type { Product } from '../shared/types/product';
import styles from './CartPage.module.scss';

type CartRow = {
  id: string;
  quantity: number;
  product: Product;
};

export const CartPage = () => {
  const navigate = useNavigate();
  const { cart, getTotalQuantity, increment, decrement, remove, clear } =
    useCart();

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clear();
    }
  };

  const { data: products, loading, error, reload } = useAsync(getProducts);

  const rows = useMemo((): CartRow[] => {
    if (!products) {
      return [];
    }

    return cart.reduce<CartRow[]>((acc, item) => {
      const product = products.find(p => p.itemId === item.id);

      if (product) {
        acc.push({ id: item.id, quantity: item.quantity, product });
      }

      return acc;
    }, []);
  }, [cart, products]);

  const totalPrice = useMemo(
    () => rows.reduce((sum, row) => sum + row.product.price * row.quantity, 0),
    [rows],
  );

  const totalQuantity = getTotalQuantity();

  if (cart.length === 0) {
    return (
      <div className={styles.page}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        >
          <span aria-hidden="true">‹</span> Back
        </button>

        <h1 className={styles.title}>Cart</h1>

        <div className={styles.empty}>
          <p className={styles.emptyText}>Your cart is empty</p>

          <Link to="/phones" className={styles.emptyLink}>
            Browse Phones
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.page}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate(-1)}
        >
          <span aria-hidden="true">‹</span> Back
        </button>

        <h1 className={styles.title}>Cart</h1>

        <p className={styles.errorText}>{error}</p>

        <button type="button" className={styles.retryBtn} onClick={reload}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button
        type="button"
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      >
        <span aria-hidden="true">‹</span> Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      <div className={styles.layout}>
        <ul className={styles.list}>
          {rows.map(({ id, quantity, product }) => (
            <li key={id} className={styles.item}>
              <button
                type="button"
                className={styles.removeBtn}
                aria-label={`Remove ${product.name} from cart`}
                onClick={() => remove(id)}
              >
                ×
              </button>

              <Link to={`/product/${id}`} className={styles.imageLink}>
                <img
                  src={`${import.meta.env.BASE_URL}${product.image}`}
                  alt={product.name}
                  className={styles.itemImage}
                />
              </Link>

              <Link to={`/product/${id}`} className={styles.itemName}>
                {product.name}
              </Link>

              <div className={styles.controls}>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() => decrement(id)}
                >
                  −
                </button>

                <span className={styles.qty}>{quantity}</span>

                <button
                  type="button"
                  className={styles.qtyBtn}
                  aria-label="Increase quantity"
                  onClick={() => increment(id)}
                >
                  +
                </button>
              </div>

              <span className={styles.itemPrice}>
                ${product.price * quantity}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.summary}>
          <p className={styles.summaryPrice}>${totalPrice}</p>

          <p className={styles.summaryMeta}>
            Total for{' '}
            {totalQuantity === 1 ? '1 item' : `${totalQuantity} items`}
          </p>

          <hr className={styles.summaryDivider} />

          <button
            type="button"
            className={styles.checkoutBtn}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
