import styles from './Cart.module.scss';
import { useAppContext } from 'components/Contexts/AppDataContext';
import CartCard from 'components/CartCard/CartCard';
import CartSummary from 'components/CartSum/CartSum';

const Cart = () => {
  const { cart } = useAppContext();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cart</h1>

      {cart.length === 0 ? (
        <div className={styles.content}>
          <div className={styles.info}>
            <p className={styles.detail}>Your cart is empty</p>
            <img
              className={styles.img}
              src="/img/cart-is-empty.png"
              alt="Cart is empty"
            />
          </div>
        </div>
      ) : (
        
        <div className={styles.cartWrapper}>
          <div className={styles.cartList}>
            {cart.map(item => (
              <CartCard key={item.product.id} item={item} />
            ))}
          </div>
          <CartSummary />
        </div>
      )}
    </div>
  );
};

export default Cart;
