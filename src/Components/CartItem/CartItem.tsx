import styles from './CartItem.module.scss';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { deleteFromCart, increaseCount, decreaseCount } = useCart();

  return (
    <div className={styles.cartItem}>
      <div className={styles.container}>
        <button
          className={styles.removeBtn}
          onClick={() => deleteFromCart(product.id)}
        ></button>

        <img src={product.image} alt={product.name} className={styles.image} />

        <div className={styles.info}>
          <p className={styles.name}>{product.name}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.controlsBtn}>
          <div
            onClick={() => decreaseCount(product.id)}
            className={styles.btnMin}
          ></div>
          <span className={styles.count}>{product.count}</span>
          <div
            onClick={() => increaseCount(product.id)}
            className={styles.btnPlus}
          ></div>
        </div>
        <p className={styles.price}>
          ${(Number(product.price) || 0) * (product.count || 1)}
        </p>
      </div>
    </div>
  );
};
