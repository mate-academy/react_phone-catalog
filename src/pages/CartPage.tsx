import { BackNavigation } from '../components/BackNavigation/BackNavigaton';
import { CartItemCard } from '../components/CartItemCard/CartItemCard';
import { useCart } from '../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { items } = useCart();

  return (
    <div className={styles.cartPage}>
      <BackNavigation />
      <h1 className={styles.title}>Cart</h1>
      <div className={styles.list}>
        {items.map(item => (
          <CartItemCard
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            count={item.count}
          />
        ))}
      </div>
      <div className={styles.checkoutBlock}>
        <p className={styles.checkoutPrice}>
          $
          {items.reduce((acc, item) => {
            const slicedPrice = item.price.slice(1);
            const transformedPrice = Number(slicedPrice);
            const multiplication = transformedPrice * item.count;

            return acc + multiplication;
          }, 0)}
        </p>
        <p className={styles.checkoutItems}>
          Total for{' '}
          {items.reduce((acc, item) => {
            return acc + item.count;
          }, 0)}{' '}
          items
        </p>

        <div className={styles.checkoutDivider} />

        <button className={styles.checkoutButton}>Checkout</button>
      </div>
    </div>
  );
};
