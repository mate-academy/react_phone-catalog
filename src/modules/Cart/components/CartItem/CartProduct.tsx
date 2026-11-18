import { Link } from 'react-router-dom';
import { CartItem, useCart } from '../../../../context/CartContext';
import styles from './CartProduct.module.scss';

type Props = {
  item: CartItem;
};

export const CartProduct: React.FC<Props> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className={styles.item}>
      <button
        className={styles.item__btn__delete}
        onClick={() => removeFromCart(item.product.id)}
      ></button>
      <img
        src={item.product.image}
        alt={item.product.name}
        className={styles.item__image}
      />
      <Link
        to={`/${item.product.category}/${item.product.id}`}
        state={{ productName: item.product.name }}
        className={styles.item__name}
      >
        {item.product.name}
      </Link>
      <div className={styles.item__quantity}>
        <button
          className={styles.item__btn__decr}
          onClick={() => decreaseQuantity(item.product.id)}
        ></button>
        <div className={styles.item__amount}>{item.quantity}</div>
        <button
          className={styles.item__btn__incr}
          onClick={() => increaseQuantity(item.product.id)}
        ></button>
      </div>
      <span className={styles.item__price}>${item.product.price}</span>
    </div>
  );
};
