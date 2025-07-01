import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CartItemContainer } from '../../components/CartItem';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { cartItems, cartTotalItemsCount } = useCart();

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs />
      </div>

      <h1 className={styles.page__title}>Cart</h1>

      {!cartItems.length ? (
        <p className={styles.page__error}>Your cart is empty</p>
      ) : (
        <div className={styles.page__container}>
          <div className={styles.page__cartContainer}>
            {cartItems.map(item => (
              <div key={item.product?.id} className={styles.page__item}>
                <CartItemContainer item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
