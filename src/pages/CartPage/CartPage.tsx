import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../components/CartItem';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.phone.priceDiscount || item.phone.priceRegular;

    return sum + price * item.quantity;
  }, 0);

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          <img src="/img/arrow_left.svg" alt="Back" />
          Back
        </button>

        <h1 className={styles.title}>Cart</h1>

        {cartItems.length === 0 ? (
          <p className={styles.empty}>Your cart is empty</p>
        ) : (
          <div className={styles.content}>
            <div className={styles.items}>
              {cartItems.map(item => (
                <CartItem
                  key={item.phone.id}
                  phone={item.phone}
                  quantity={item.quantity}
                  onRemove={() => removeFromCart(item.phone.id)}
                  onIncrease={() => increaseQuantity(item.phone.id)}
                  onDecrease={() => decreaseQuantity(item.phone.id)}
                />
              ))}
            </div>

            <div className={styles.summary}>
              <div className={styles.totalPrice}>${totalPrice}</div>
              <div className={styles.totalItems}>
                Total for {totalItems} items
              </div>
              <div className={styles.divider} />
              <button type="button" className={styles.checkout}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
