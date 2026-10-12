import { Link } from 'react-router-dom';
import { CartItemView } from '../../components/CartItem';
import { useShop } from '../../shared/context/ShopContext';
import styles from './CartPage.module.scss';

export function CartPage() {
  const { cart, clearCart } = useShop();
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const checkout = () => {
    if (
      window.confirm(
        'Checkout is not implemented yet. Do you want to clear the Cart?',
      )
    ) {
      clearCart();
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link to="/">Home</Link>&nbsp; › &nbsp;Cart
      </div>
      <button className={styles.back} onClick={() => window.history.back()}>
        ← Back
      </button>
      <h1>Cart</h1>
      {!cart.length ? (
        <div className={styles.empty}>
          <p>Your cart is empty</p>
          <img src="img/cart-is-empty.png" alt="Empty shopping cart" />
          <Link to="/phones">Go shopping</Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <div>
            {cart.map(item => (
              <CartItemView item={item} key={item.id} />
            ))}
          </div>
          <aside className={styles.summary}>
            <strong>${total}</strong>
            <p>Total for {quantity} items</p>
            <div />
            <button onClick={checkout}>Checkout</button>
          </aside>
        </div>
      )}
    </section>
  );
}
