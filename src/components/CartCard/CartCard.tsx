//#region imports
import styles from './CartCard.module.scss';
//#endregion

//#region svgs
import Close from '../../icons/Close.svg';
//#endregion

import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

type Props = {
  product: Product;
  quantity: number;
};

export function CartCard({ product, quantity }: Props) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className={styles.CartCard}>
      <div className={styles.top}>
        <img
          className={styles.top__del}
          src={Close}
          alt=""
          onClick={() => removeFromCart(product.itemId)}
        />
        <img
          className={styles.top__img}
          src={`${import.meta.env.BASE_URL}${product.image}`}
          alt=""
        />
        <h2 className={styles.top__title}>{product.name}</h2>
      </div>
      <div className={styles.bot}>
        <div className={styles.buttons}>
          <button
            className={styles.buttons__dob}
            onClick={() => decreaseQuantity(product.itemId)}
          >
            -
          </button>
          <span className={styles.buttons__value}>{quantity}</span>
          <button
            className={styles.buttons__dob}
            onClick={() => increaseQuantity(product.itemId)}
          >
            +
          </button>
        </div>
        <p className={styles.bot__price}>${product.price * quantity}</p>
      </div>
    </div>
  );
}
