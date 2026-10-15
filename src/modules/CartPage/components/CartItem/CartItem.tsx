import { useCart } from '../../../../context/CartContext';
import { CartItem as cartItem } from '../../../../types/CartItem';
import { Link } from 'react-router-dom';
import styles from './CartItem.module.scss';

type Props = {
  item: cartItem;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className={styles.cartitem}>
      <div className={styles.cartitem__top}>
        <button
          type="button"
          className={styles.cartitem__remove}
          onClick={() => removeFromCart(item.id)}
        >
          <span className={styles.cartitem__remove_icon}></span>
        </button>

        <Link to={`/product/${item.id}`} className={styles.cartitem__link}>
          <img className={styles.cartitem__img} src={item.product.image}></img>
        </Link>

        <Link to={`/product/${item.id}`} className={styles.cartitem__name}>
          {item.product.name}
        </Link>
      </div>
      <div className={styles.cartitem__bottom}>
        <div className={styles.cartitem__quantity}>
          <button
            type="button"
            className={styles.cartitem__decrease}
            onClick={() => decreaseQuantity(item.id)}
            disabled={item.quantity === 1}
          ></button>
          <span className={styles.cartitem__count}>{item.quantity}</span>
          <button
            type="button"
            className={styles.cartitem__increase}
            onClick={() => increaseQuantity(item.id)}
          ></button>
        </div>

        <h2
          className={styles.cartitem__price}
        >{`$${item.product.price * item.quantity}`}</h2>
      </div>
    </div>
  );
};
