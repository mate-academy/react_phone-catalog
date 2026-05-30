import styles from './CartPage.module.scss';
import { ButtonBack } from '../../components/ButtonBack';
import { useCart } from './context/CartContext';
import { CartItem } from './CartItem/CartItem';

export const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <ButtonBack />
        <h1 className={styles.title}>Cart</h1>
        <div className={styles.items}>
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} onRemove={removeFromCart} />
          ))}
        </div>
        <div className={styles.checkout}>
          <p className={styles.totalPrice}>${totalPrice}</p>
          <p className={styles.count}>{`Total for ${totalCount} items`}</p>

          <button className={styles.checkoutButton}>Checkout</button>
        </div>
      </div>
    </div>
  );
};
