import { useCart } from '../../shared/context/CartContext';
import { CartItem } from './CartItem/CartItem';
import { BackButton } from '../../components/BackButton/BackButton';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { items, totalPrice, removeFromCart, increase, decrease, clearCart } =
    useCart();

  const handleCheckout = () => {
    const confirmed = confirm("Checkout isn't available yet. Clear your cart?");

    if (confirmed) {
      clearCart();
    }
  };

  /* EMPTY CART */
  if (!items.length) {
    return (
      <section className={styles.empty}>
        <img
          src="./img/cart-is-empty.png"
          alt="Cart is empty"
          className={styles.emptyImage}
        />

        <p className={styles.emptyText}>Your cart is empty</p>

        <button className={styles.btn}>Continue shopping</button>
      </section>
    );
  }

  /* FILLED CART */
  return (
    <section className={styles.page}>
      <BackButton />

      <div className={styles.cart}>
        <h1 className={styles.title}>Cart</h1>

        <div className={styles.content}>
          <div className={styles.items}>
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                increase={increase}
                decrease={decrease}
                remove={removeFromCart}
              />
            ))}
          </div>

          <aside className={styles.summary}>
            <div className={styles.totalBlock}>
              <span className={styles.totalPrice}>${totalPrice}</span>
              <p className={styles.count}>Total for {items.length} items</p>
            </div>

            <button className={styles.checkout} onClick={handleCheckout}>
              Checkout
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};
