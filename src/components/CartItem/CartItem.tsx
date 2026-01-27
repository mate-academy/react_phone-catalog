import { CartItemType } from '../../types/CartItem';
import { Product } from '../../types/Product';
import styles from './CartItem.module.scss';

type Props = {
  item: CartItemType;
  removeFromCart: (value: string) => void;
  increase: (value: string) => void;
  decrease: (value: string) => void;
  totalPrice: number;
  product: Product;
};

export const CartItem = ({
  item,
  removeFromCart,
  increase,
  decrease,
  totalPrice,
  product,
}: Props) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__firstRow}>
        <button
          className={styles.cartItem__buttonDelete}
          onClick={() => removeFromCart(item.productId)}
        ></button>
        <img
          src={product.image}
          alt={product.itemId}
          className={styles.cartItem__img}
        />
        <span className={styles.cartItem__name}>{product.name}</span>
      </div>

      <div className={styles.cartItem__secondRow}>
        <div className={styles.cartItem__counter}>
          <button
            onClick={() => decrease(item.productId)}
            disabled={item.quantity === 1}
            className={`${styles.cartItem__button} ${styles['cartItem__button--decrease']}`}
          ></button>
          <div className={styles.cartItem__itemQuantity}>{item.quantity}</div>
          <button
            onClick={() => increase(item.productId)}
            className={`${styles.cartItem__button} ${styles['cartItem__button--increase']}`}
          ></button>
        </div>
        <div className={styles.cartItem__totalPrice}>${totalPrice}</div>
      </div>
    </div>
  );
};
