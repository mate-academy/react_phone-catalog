import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { getProductPrice } from '../../shared/utils/format';
import { CartItem as CartItemType } from '../../api/types';
import { CartItem } from './components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cart, clearCart } = useShop();

  const totalAmount = cart.reduce(
    (sum, item) => sum + getProductPrice(item.product) * item.quantity,
    0,
  );
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const confirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Cart</h1>
        <div className={styles.empty}>
          <p>Your cart is empty</p>
          <Link to="/">Go to products</Link>
        </div>
      </div>
    );
  }

  const cartItems: CartItemType[] = cart;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Cart</h1>
      <div className={styles.list}>
        {cartItems.map(item => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>
      <div className={styles.summary}>
        <span className={styles.summaryText}>
          Total amount: ${totalAmount} / Quantity: {totalQuantity}
        </span>
        <button
          type="button"
          className={styles.checkoutButton}
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
