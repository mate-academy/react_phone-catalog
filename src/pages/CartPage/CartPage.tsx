import { Link, useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { useCart } from '../../context/CartContext/CartContext';

const allProducts = [
  ...phones.map(product => ({ ...product, category: 'phones' })),
  ...tablets.map(product => ({ ...product, category: 'tablets' })),
  ...accessories.map(product => ({ ...product, category: 'accessories' })),
];

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, totalCount, changeQuantity, removeFromCart, clearCart } =
    useCart();

  const cartProducts = items.flatMap(item => {
    const product = allProducts.find(p => p.id === item.id);

    return product ? [{ product, quantity: item.quantity }] : [];
  });

  const totalPrice = cartProducts.reduce(
    (sum, { product, quantity }) => sum + product.priceDiscount * quantity,
    0,
  );

  const handleCheckout = () => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <img src="/img/icons/arrow-left.svg" alt="" />
        Back
      </button>

      <h1 className={styles.title}>Cart</h1>

      {cartProducts.length === 0 ? (
        <div className={styles.empty}>
          <p>Your cart is empty</p>
          <Link to="/phones" className={styles.emptyLink}>
            Browse phones
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <ul className={styles.list}>
            {cartProducts.map(({ product, quantity }) => (
              <li key={product.id} className={styles.item}>
                <button
                  type="button"
                  className={styles.remove}
                  aria-label="Remove from cart"
                  onClick={() => removeFromCart(product.id)}
                >
                  ×
                </button>

                <Link
                  to={`/${product.category}/${product.id}`}
                  className={styles.image}
                >
                  <img src={`/${product.images[0]}`} alt={product.name} />
                </Link>

                <Link
                  to={`/${product.category}/${product.id}`}
                  className={styles.name}
                >
                  {product.name}
                </Link>

                <div className={styles.quantity}>
                  <button
                    type="button"
                    className={styles.qtyButton}
                    aria-label="Decrease quantity"
                    disabled={quantity === 1}
                    onClick={() => changeQuantity(product.id, -1)}
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{quantity}</span>
                  <button
                    type="button"
                    className={styles.qtyButton}
                    aria-label="Increase quantity"
                    onClick={() => changeQuantity(product.id, 1)}
                  >
                    +
                  </button>
                </div>

                <span className={styles.price}>
                  {`$${product.priceDiscount * quantity}`}
                </span>
              </li>
            ))}
          </ul>

          <aside className={styles.summary}>
            <p className={styles.total}>{`$${totalPrice}`}</p>
            <p className={styles.totalLabel}>
              {`Total for ${totalCount} ${totalCount === 1 ? 'item' : 'items'}`}
            </p>
            <hr className={styles.line} />
            <button
              type="button"
              className={styles.checkout}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};
