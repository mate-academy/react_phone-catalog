import { BackButton } from 'src/components/ui/BackButton/BackButton';
import styles from './CartPage.module.scss';
import { useStoreContext } from 'src/context/StoreContext';
import { CartCard } from 'src/components/CartCard/CartCard';
import { EmptyState } from 'src/components/EmptyState/EmptyState';
import { Modal } from 'src/components/ui/Modal/Modal';

export const CartPage = () => {
  const { cartProducts } = useStoreContext();

  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const totalQuantity = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  return (
    <div className={styles.cartPage}>
      <BackButton className={styles.backButton} />
      <h1 className={styles.pageTitle}>Cart</h1>

      <div className={styles.cart}>
        <ul className={styles.productList}>
          {cartProducts.map(el => (
            <li key={el.id}>
              <CartCard cartProduct={el} />
            </li>
          ))}
        </ul>

        {cartProducts.length > 0 && (
          <div className={styles.cartSummary}>
            <div className={styles.info}>
              <p className={styles.totalPrice}>${totalPrice}</p>
              <p className={styles.totalItems}>
                Total for {totalQuantity} items
              </p>
            </div>

            <hr className={styles.divider} />

            <Modal />
          </div>
        )}
      </div>
      {cartProducts.length === 0 && <EmptyState type="cart" />}
    </div>
  );
};
