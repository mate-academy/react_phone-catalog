import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { fetchListProducts } from '../../services/products';
import { getAssetPath } from '../../utils/assets';
import { formatCurrency } from '../../utils/format';
import type { Product } from '../../types';
import styles from './CartPage.module.scss';

const getCartImage = (path?: string) => {
  if (!path) {
    return getAssetPath('img/product-not-found.png');
  }

  if (path.startsWith('http')) {
    return path;
  }

  if (
    import.meta.env.BASE_URL !== '/' &&
    path.startsWith(import.meta.env.BASE_URL)
  ) {
    return path;
  }

  return getAssetPath(path);
};

export const CartPage = () => {
  const navigate = useNavigate();
  const [freshProducts, setFreshProducts] = useState<Product[]>([]);
  const {
    items,
    changeQuantity,
    removeFromCart,
    totalAmount,
    totalQuantity,
    clearCart,
  } = useCart();

  useEffect(() => {
    fetchListProducts()
      .then(setFreshProducts)
      .catch(() => setFreshProducts([]));
  }, []);

  const canCheckout = items.length > 0;
  const handleCheckout = () => {
    if (
      !window.confirm(
        'Checkout is not implemented yet. Do you want to clear the Cart?',
      )
    ) {
      return;
    }

    clearCart();
  };

  const quantityText = useMemo(
    () => `${totalQuantity} item${totalQuantity === 1 ? '' : 's'}`,
    [totalQuantity],
  );
  const productsById = useMemo(
    () =>
      new Map(
        freshProducts.map(product => [
          (product.itemId || product.id).toString(),
          product,
        ]),
      ),
    [freshProducts],
  );

  if (!items.length) {
    return (
      <div className={styles.empty}>
        <img src={getAssetPath('img/cart-is-empty.png')} alt="" />
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <h1>Cart</h1>
      <div className={styles.list}>
        {items.map(item => {
          const product = item.product;
          const freshProduct = productsById.get(item.id);
          const price =
            product.price ?? product.priceDiscount ?? product.priceRegular ?? 0;
          const image = getCartImage(
            freshProduct?.image ?? product.image ?? product.images?.[0],
          );

          return (
            <div key={item.id} className={styles.item}>
              <button
                type="button"
                className={styles.remove}
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${product.name} from cart`}
              >
                ×
              </button>
              <img className={styles.image} src={image} alt={product.name} />
              <h2 className={styles.title}>{product.name}</h2>
              <div className={styles.controls}>
                <button
                  type="button"
                  onClick={() => changeQuantity(item.id, item.quantity - 1)}
                  aria-label={`Decrease quantity of ${product.name}`}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => changeQuantity(item.id, item.quantity + 1)}
                  aria-label={`Increase quantity of ${product.name}`}
                >
                  +
                </button>
              </div>
              <strong className={styles.itemPrice}>
                {formatCurrency(price * item.quantity)}
              </strong>
            </div>
          );
        })}
      </div>
      <aside className={styles.summary}>
        <strong>{formatCurrency(totalAmount)}</strong>
        <span>Total for {quantityText}</span>
        <button
          type="button"
          className={styles.checkout}
          onClick={handleCheckout}
          disabled={!canCheckout}
        >
          Checkout
        </button>
      </aside>
    </main>
  );
};
