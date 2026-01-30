import styles from './CartPage.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext';
import { CartItem } from '../../components/CartItem/CartItem';
import arrowLeft from './../../img/icons/Chevron Arrow Left.svg';

export const CartPage = () => {
  const { items, totalPrice } = useCart();

  return (
    <div className="container">
      <Link to="/" className={styles.backLink}>
        <img src={arrowLeft} alt="Back" />
        <div className={styles.backText}>Back</div>
      </Link>

      <h1 className={styles.title}>Cart</h1>

      <div className={styles.content}>
        <div className={styles.list}>
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className={styles.summary}>
          <h2 className={styles.total}>${totalPrice}</h2>
          <p className={styles.subtitle}>Total for {items.length} items</p>

          <button className={styles.checkout}>Checkout</button>
        </aside>
      </div>
    </div>
  );
};
