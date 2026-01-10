import { Container } from '../../components/Container';
import { Button } from '../shared/components/Button';
import { EmptyState } from '../shared/components/EmptyState';
import { useCart } from '../shared/context/CartContext';
import { CartItem } from './components/CartItem';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const {
    items,
    totalPrice,
    totalQuantity,
    removeFromCart,
    changeQuantity,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    const agreed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (agreed) {
      clearCart();
    }
  };

  return (
    <Container className={styles.page}>
      <h1 className={styles.title}>Cart</h1>

      {items.length === 0 ? (
        <EmptyState title="Your cart is empty" />
      ) : (
        <div className={styles.layout}>
          <div className={styles.list}>
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => removeFromCart(item.id)}
                onChangeQuantity={quantity => changeQuantity(item.id, quantity)}
              />
            ))}
          </div>

          <aside className={styles.summary}>
            <p className={styles.total}>${totalPrice.toLocaleString()}</p>
            <p className={styles.caption}>Total for {totalQuantity} items</p>
            <Button className={styles.checkout} onClick={handleCheckout}>
              Checkout
            </Button>
          </aside>
        </div>
      )}
    </Container>
  );
};
